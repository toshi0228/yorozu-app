import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Select } from 'antd';
import { readTagEvent } from '../../../store/actions/tags';
import _ from 'lodash';

const { Option } = Select;

const InputTag = ({ setTags, tagsData, readTagEvent }) => {
  // =====================================================================================
  // ロダッシュを使って、タグデータ(type:オブジェクト)を読み込む
  // mapとの違いは配列ではなく、オブジェクトを受け取ってオブジェクトを返す
  // ▼参考サイト１
  // https://techblog.kayac.com/2017-12-2_lodash
  // =====================================================================================

  // =====================================================================================
  // optionTagListにオプションタグを入れていく
  // 親コンポーネントから送られてきたタグの数だけオプションを追加する
  // タグを検索するときにデータベースから候補として表示させる
  // =====================================================================================

  const optionTagList = [];

  _.map(tagsData, tag => {
    optionTagList.push(<Option key={tag.name}>{tag.name}</Option>);
  });

  useEffect(() => {
    readTagEvent();
  }, []);

  // =====================================================================================
  // OptionTagKeyListには、Optionタグの keyの値が入る
  // ex)["企画", "デザイン", "遊び", "インスタグラム"]
  // setTagには、選択したタグと、新しく入力したタグが入る
  // =====================================================================================

  const handleChange = OptionTagKeyList => {
    setTags(OptionTagKeyList);
  };

  // =====================================================================================
  // onChange={handleChange}引数がどこから受け取ってるかわからないがantデザインの使用なんだろう
  // handleChangeの引数には、Optionタグの keyの値がvalueとして入る
  // <Option key={tag.name}>{tag.name}</Option>
  // =====================================================================================

  // =====================================================================================
  // <Select mode="tags" style={{ width: '100%' }} onChange={handleChange}></Select>
  // Selectタグのmodeオプション
  // multipleとtagの違い
  // multipleは、データベースからあるか探す
  // tagは作り出す
  // =====================================================================================

  return (
    <Row style={{ marginBottom: 64 }}>
      <Col span={12} offset={3}>
        <Select mode="tags" style={{ width: '100%' }} onChange={handleChange}>
          {optionTagList}
        </Select>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => {
  return {
    tagsData: state.tag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    readTagEvent: () => {
      return dispatch(readTagEvent());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTag);
