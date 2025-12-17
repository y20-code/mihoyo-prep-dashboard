import type {PlanItem,PlanType} from '../types';

const STORAGE_KEY = "mmihoyo-plans";

const sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

export const planService = {
    async getAll():Promise<PlanItem[]>{
        await sleep(800);
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    async add (content:string ,type:PlanType):Promise<PlanItem>{
    await sleep(500);
    const newPlan:PlanItem = {
        id: Date.now(),
        content,
        isCompleted: false,
        type,
        createdAt: Date.now()
    };
    
    // 先读旧数据，再存新数据 (模拟数据库操作)
    const current = await this.getAll();
    const updated = [...current, newPlan];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    return newPlan;

    },
    // 3. 删除任务 (模拟 DELETE)
    async delete (id:number):Promise<void>{
        await sleep(500);
        const current = await this.getAll();
        const updated = current.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },

    // 4. 切换任务完成状态 (模拟 PATCH)
    async toggle(id:number):Promise<void>{
        await sleep(500);
        const current = await this.getAll();
        const updated = current.map(item => {
            if(item.id === id){
                return {...item, isCompleted: !item.isCompleted};
            }else{
                return item;
            }
        })
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

}



