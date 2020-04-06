import React, { useEffect } from 'react';
import { Col, Row, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const InputTag = ({ tags, setTags }) => {
  // この中にオプションタグを入れていく
  const children = [];

  // 親コンポーネントから送られてきたタグの数だけオプションを追加する
  tags.forEach((tag, index) => {
    children.push(<Option key={index.toString()}>{tag}</Option>);
  });

  // タグを検索するときにデータベースから候補として表示させる
  const feachTags = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/tag/');
    const tags = response.data.reduce((previous, tag) => {
      previous.push(tag.name);
      return previous;
    }, []);
    setTags(tags);
  };

  useEffect(() => {
    feachTags();
  });

  // =====================================================================================
  // 元々のタグの場合valueには数字が入る;
  // ex) ["1", "デザイン", "遊び", "2"] => ["企画", "デザイン", "遊び", "インスタグラム"]
  // 数字の場合、valueの文字数が一の場合変換する
  // newTagsは、formから選択されたtagと新しく追加したタグ
  // =====================================================================================

  const handleChange = value => {
    console.log(value);
    tags = value.map(value => {
      if (value.length === 1) {
        return tags[value];
      } else {
        return value;
      }
    });
    console.log(tags);
    setTags(tags);
  };

  // =====================================================================================
  // onChange={handleChange}引数がどこから受け取ってるかわからないがantデザインの使用なんだろう
  // =====================================================================================

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

// =====================================================================================
// Selectタグのmodeオプション
// multipleとtagの違い
// multipleは、データベースからあるか探す
// tagは作り出す
// =====================================================================================
