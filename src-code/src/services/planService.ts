import { message } from 'antd';
import type {PlanItem,PlanType} from '../types';

const STORAGE_KEY = "mmihoyo-plans";

const sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

//模拟拦截层
// 所有的请求都要进过这个函数
async function request<T>(callback: () => T):Promise<T>{
    await sleep(800);

    if(Math.random() < 0.1){
        const errorMsg = "网络错误，请稍后重试";
        message.error(errorMsg);
        throw new Error(errorMsg);
    }

    return callback();
}


export const planService = {
    async getAll():Promise<PlanItem[]>{
        return request(() => {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        });
    },

    async add (content:string ,type:PlanType):Promise<PlanItem>{
        return request(() =>{
            const newPlan:PlanItem = {
            id: Date.now(),
            content,
            isCompleted: false,
            type,
            createdAt: Date.now()
        };
        
        // 先读旧数据，再存新数据 (模拟数据库操作)
        const data = localStorage.getItem(STORAGE_KEY);
        const current = data ? JSON.parse(data): [];
        const updated = [...current, newPlan];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        
        return newPlan;
        })
        

    },
    // 3. 删除任务 (模拟 DELETE)
    async delete (id:number):Promise<void>{
        return request(() => {
            const data = localStorage.getItem(STORAGE_KEY);
            const current: PlanItem[] = data ? JSON.parse(data) : [];
            const updated = current.filter(item => item.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        });
    },

    // 4. 切换任务完成状态 (模拟 PATCH)
    async toggle(id:number):Promise<void>{
        return request(() => {
            const data = localStorage.getItem(STORAGE_KEY);
            const current: PlanItem[] = data ? JSON.parse(data) : [];
            const updated = current.map(item => 
                item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
            );
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        });
    }

}



