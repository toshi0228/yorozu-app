import React from 'react'
import { Form, Input, Button } from 'antd'

const FormPage = () => {
  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const handleSubmit = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="content">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button onSubmit={handleSubmit}>送信</Button>
        </Form.Item>
      </Form>
      <div>formPage</div>
    </>
  )
}

export default FormPage
