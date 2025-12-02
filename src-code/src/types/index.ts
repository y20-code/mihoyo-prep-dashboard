// 定义三个核心板块：算法、理论、项目
export type PlanType = 'algorithm' | 'theory' | 'project'

export interface PlanItem{
    id:number;
    content:string;         // 任务内容
    isCompleted:boolean;    // 是否完成
    type:PlanType;          // 任务类型
    createdAt:number;       // 创建时间
}