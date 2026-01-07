import react from 'react';
import { Typography,Divider } from 'antd';
import Icon, {CheckOutlined,CloseOutlined} from '@ant-design/icons'
const {Title,Text,Paragraph} = Typography;

const PracticeTypography:React.FC = () =>{
    return (
        <div style={{padding:'20px'}}>
            <Title level={2}>玩家信息管理</Title>

            <Divider/>

            <div style={{marginBottom:'20px'}}>
                <Text strong >玩家UID:</Text>
                <Text code  copyable={{icon:[<CheckOutlined />,<CloseOutlined />]}}>100865321</Text>
            </div>

            <div style={{ marginBottom: '20px' }}>
        <Text strong>玩家备注：</Text>
        
        <Paragraph 
            editable={{ 
                onChange: (text) => console.log('备注修改为:', text) 
            }}
        >
          这是一个超级氪金大佬，请注意服务态度。
        </Paragraph>

        {/* 练习 3: 状态颜色和省略号 */}
      <div style={{ width: '200px', border: '1px solid #eee' }}>
         <Text type="danger">封号状态：异常</Text>
         <br/>
         {/* ellipsis: 超过宽度自动变成省略号 ... */}
         <Text ellipsis={true}>
           违规原因：使用了非法外挂工具，检测时间2023-10...
         </Text>
      </div>
      </div>
        </div>
    )
}

export default PracticeTypography;