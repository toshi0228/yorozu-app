import React, { useEffect } from 'react';
import { Col, Row, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const InputTag = ({ tags, setTags }) => {
  const children = [];

  tags.forEach((tag, index) => {
    children.push(<Option key={index.toString()}>{tag}</Option>);
  });

  const feachTags = async () => {
    const response = await axios.get('http://localhost:8080/create_plan');
    const tags = response.data.reduce((previous, tag) => {
      previous.push(...tag.tags);
      return previous;
    }, []);
    setTags([...new Set(tags)]);
  };

  useEffect(() => {
    feachTags();
  });

  const handleChange = value => {
    console.log(value);
  };

  return (
    <Row style={{ marginBottom: 64 }}>
      <Col span={12} offset={3}>
        <Select mode="tags" style={{ width: '100%' }} onChange={handleChange}>
          {children}
        </Select>
      </Col>
    </Row>
  );
};

export default InputTag;
