import React from 'react';
import { FloatButton } from 'antd';
import { QuestionCircleOutlined,SyncOutlined, UserOutlined } from '@ant-design/icons';

const PracticeFloatButton:React.FC = ()=> {
    return (
        <div style={{padding:'20px'}}>
            <h1>FloatButton 练习</h1>
            <p>请往下滚动页面，查看右下角的变化...</p>

            {Array.from({ length: 100 }, (_, i) => (
                <div key={i}>这是第 {i + 1} 行内容，为了让你能滚动页面...</div>
            ))}

            <FloatButton 
                icon={<QuestionCircleOutlined/>}
                type="primary"
                style={{right:24}}
                shape="square"
                onClick={() => console.log('点击了客服')}
                tooltip="联系客服"
            />

            <FloatButton.Group
                shape="circle"
                style={{ right: 94 }} // 为了不重叠，往左移一点
            >
                <FloatButton icon={<QuestionCircleOutlined />} />
                <FloatButton icon={<SyncOutlined />} />
                
                
                <FloatButton.BackTop visibilityHeight={400} /> 
                
            </FloatButton.Group>

            <FloatButton.Group
                style={{right:200}}
            >
                <FloatButton 
                    icon={<UserOutlined/>}
                    type="default"
                    tooltip="点击反馈 Bug"
                
                ></FloatButton>
                <FloatButton.BackTop
                    visibilityHeight={0}
                />
            </FloatButton.Group>
            

            

        </div>
    )
}

export default PracticeFloatButton;