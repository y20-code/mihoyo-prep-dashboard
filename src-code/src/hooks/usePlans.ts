import {useState,useEffect, useCallback} from "react"
import type { PlanType,PlanItem } from "../types"

import { planService } from "../services/planService";

export function usePlans(){

    const [loading,setLoading] = useState(false);

    const [plans,setPlans] = useState<PlanItem[]>([]);

    const fetchPlans = useCallback (async () =>{
        setLoading (true);
        try {
            const data = await planService.getAll();
            setPlans(data);
        }catch (e) {
            // 这里不需要 alert 了，因为 Service 层已经弹窗了
            // 只需要处理数据回滚或保持原样
            console.error("Fetch failed", e);
        }finally {
            setLoading(false);
        }
    },[]);

    useEffect(() => {
        fetchPlans();
    },[fetchPlans])

    //添加一个任务
    const addPlan = async (content:string,type:PlanType) =>{
        // 这里的逻辑：先发请求，成功了再刷新
        // 如果请求在 Service 层抛错，代码会中断，不会执行下面的 fetchPlans
        // 从而保证了数据的一致性
        try {
            await planService.add(content, type);
            await fetchPlans();
        } catch (e) {
            // 失败了什么都不用做，因为 Service 层已经弹窗提示用户了
        }
    };

    //删除一个任务
    const deletePlan = async(id: number) => {
        try {
            await planService.delete(id);
            // 成功后，手动更新本地 state (比重新 fetch 更快)
            setPlans(prev => prev.filter(p => p.id !== id));
        } catch(e) {
            // 如果删除失败，这里不更新 state，界面会自动保持原样
        }
    };

    // 3. 切换状态 (打钩/取消)
    const toggleTodo = async(id: number) => {
        try {
             // 乐观更新：先改 UI
            setPlans(prev => prev.map(item => 
                item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
            ));
            await planService.toggle(id);
        } catch (e) {
            // 如果后端报错，这里应该回滚 UI (Revert)
            // 也就是把状态改回去
            setPlans(prev => prev.map(item => 
                item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
            ));
        }
    };
    

    return {addPlan,deletePlan,toggleTodo,plans,loading}
}