import { useState } from "react";
import {Button,Modal,Form,Input,message} from "antd";

function PracticeModal() {
    const [isOpen,setIsOpen] = useState(false);

    const [form] = Form.useForm();

    const showModel = () =>{
        setIsOpen(true);
    }

    const handleCancel = () =>{
        setIsOpen(false);
    }

    const handleOk = async () => {
        try {
            // A. 遥控器指令：检查所有格子填没填？(验证)
            // 如果没填必填项，代码会在这里停住，并在界面上标红。
            const values = await form.validateFields();
            
            // B. 拿到数据了！
            console.log("用户填写的表单数据:", values);
            message.success("提交成功！"); // 弹个绿色提示
            
            // C. 关窗 + 清空表单
            setIsOpen(false);
            form.resetFields(); // 遥控器指令：把格子清空
            
        } catch (error) {
            console.log("校验失败:", error);
        }
    };

    return (
        <div>
            <Button onClick={showModel}>打开表单弹窗</Button>

            <Modal
                title="练习弹窗"

                open={isOpen}

                onCancel={handleCancel}

                onOk={handleOk}

                okText="提交表单"
                cancelText="取消表单"
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        label="你的名字"
                        name="username"
                        rules={[{required:true,message:'必须填写名字'}]}
                    >
                        <Input placeholder="请输入名字"/>

                    </Form.Item>

                    <Form.Item
                        label="自我介绍"
                        name="bio"
                    >
                        <Input.TextArea placeholder="请输入自我介绍"/>
                    </Form.Item>


                </Form>
            </Modal>
        </div>
       
    )
}

export default PracticeModal;