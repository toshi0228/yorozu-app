import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Select } from 'antd'
import { readTagEvent } from '../../../store/actions/tags'
import _ from 'lodash'

const { Option } = Select

// setTags,tagListは、createPlanのrightComponentsから来ている
// tagsDataは、すでに登録してあるタグデータが入っている タグを選択する時に、選択肢としてでる
const InputTag = ({ setTags, tagList, tagsData, readTagEvent }) => {
  const [tagValue, setTagValue] = useState(tagList)

  // tagListをvalueにしたいが、ここでsetTagsをしてもvalueが変更されないので変更する
  // value={tagValue}にするために
  useEffect(() => {
    setTagValue(tagList)
  }, [tagList])

  // optionTagList => タグを選択する時に、選択肢
  const optionTagList = []

  _.map(tagsData, (tag) => {
    optionTagList.push(<Option key={tag.name}>{tag.name}</Option>)
  })

  // タグを入力する時に、inputに選択項目を出すために最初に登録してあるtagデータを読み込む
  useEffect(() => {
    readTagEvent()
  }, [])

  const handleChange = (OptionTagKeyList) => {
    // rightComponentsのtagの値が変わる
    setTags(OptionTagKeyList)
    // 入力してあるデータを変更する
    setTagValue(OptionTagKeyList)
  }

  // タグの入力に関して、編集する時にもし登録してあるデータがある場合は、defaultにすでに登録してあるデータを埋め込む
  const toggleInputTag = () => {
    // tagList.lengthなら、タグは何も登録されていない'
    if (tagList.length === 0) {
      return (
        <Select
          mode="tags"
          style={{ width: '100%' }}
          onChange={handleChange}
          value={tagValue}
          placeholder="サプライズ、エンタメ、エンジニア...etc"
        >
          {optionTagList}
        </Select>
      )
    } else {
      // tagListは、すでに登録してあるタグが入っている
      return (
        <Select
          mode="tags"
          style={{ width: '100%' }}
          onChange={handleChange}
          // value={tagList}
          value={tagValue}
          placeholder="サプライズ、エンタメ、エンジニア...etc"
        >
          {optionTagList}
        </Select>
      )
    }
  }

  return (
    <Row>
      <Col>{toggleInputTag()}</Col>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    tagsData: state.tag,
  }
}

const mapDispatchToProps = (dispatch) => ({
  readTagEvent: () => dispatch(readTagEvent()),
})

export default connect(mapStateToProps, mapDispatchToProps)(InputTag)

// =====================================================================================
// 本来なら、readTagEvent()(dispatch)とするべきだが、最後の関数実行は、thunkの仕事
// 返すオブジェクトを()で囲わないと、オブジェクトの{}が関数のブロックと解釈される
// const mapDispatchToProps = dispatch => ({
//   readTagEvent: () => dispatch(readTagEvent()(dispatch))
// });
// =====================================================================================

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

// =====================================================================================
// OptionTagKeyListには、Optionタグの keyの値が入る
// ex)["企画", "デザイン", "遊び", "インスタグラム"]
// setTagには、選択したタグと、新しく入力したタグが入る
// =====================================================================================
