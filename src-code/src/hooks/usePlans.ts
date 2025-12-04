import {useState,useEffect} from "react"
import type { PlanType,PlanItem } from "../types"

export function usePlans(){

    const [plans,setPlans] = useState<PlanItem[]>(() =>{
        const saved = localStorage.getItem("mihoyo-plans");
        if (saved) {
            try {
                return JSON.parse(saved); // 把字符串变回数组
            } catch (e) {
                return []; // 如果数据坏了，就返回空
            }
        }
        return [];
    })

    useEffect(() => {
        localStorage.setItem("mihoyo-plans",JSON.stringify(plans))
    },[plans])

    //添加一个任务
    const addPlan = (content:string,type:PlanType) =>{
        const newPlan:PlanItem = {
            id:Date.now(),
            content,
            isCompleted:false,
            type,
            createdAt:Date.now()
        }

        setPlans([...plans,newPlan])
    }

    //删除一个任务
    const deletePlan = (id:number) =>{
        const newPlan = plans.filter((item) => item.id !==id)
        setPlans(newPlan)
    }

    // 3. 切换状态 (打钩/取消)
    const toggleTodo = (id: number) => {
        const newPlan = plans.map((item) =>{
            if(item.id == id){
                return {...item,isCompleted:!item.isCompleted};
            }
            return item;
        })

        setPlans(newPlan)
    };
    

    return {addPlan,deletePlan,toggleTodo,plans}
}