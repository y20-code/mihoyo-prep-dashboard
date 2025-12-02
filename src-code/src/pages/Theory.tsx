import {Card} from 'antd'

const Theory = () =>{
    return (
        <div style={{ padding: '20px' }}>
            <h2>📖 理论内功心法</h2>
            <Card title="核心概念" bordered={false} style={{ marginTop: 16 }}>
                <p>✅ 引用类型 vs 值类型</p>
                <p>✅ 深拷贝 (Deep Clone)</p>
                <p>⬜ 闭包 (Closure)</p>
            </Card>
        </div>
    )
}

export default Theory;