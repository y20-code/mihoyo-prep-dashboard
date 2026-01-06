import React from 'react';

import {Button,Space} from 'antd';

const PracticeButton:React.FC = () => {
    return (
        <div style={{padding: '50px'}}>
            <Button>我是一个默认按钮</Button>

            <div style={{ height: '20px' }}></div>

            <Button type="primary" size="large" variant='outlined' color='pink'> 
                大号主按钮
            </Button>

            <div style={{ height: '20px' }}></div>

            {/* 3. 另一种变种：圆形 + 虚线 */}
            <Button type="dashed" shape="circle">
                圆
            </Button>

            <div style={{ height: '20px' }}></div>
            
            {/* 4. 危险按钮 (API 里有个 danger: boolean) */}
            <Button type="primary" danger={true}>
                删除数据 (Danger)
            </Button>


        </div>
    )
}

export default PracticeButton;