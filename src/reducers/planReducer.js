// import _ from 'lodash';


const initDate ={
    planList:[
        {id:0, userName:"name", title:'タイトル', sentence:"ああああああ"},
        {id:1, userName:"name",title:'タイトル', sentence:"いいいいいい"},
        {id:2, userName:"name",title:'タイトル', sentence:"うううううう"},
      ],
}

const planData = (state = initDate, action) => {
    
    switch(action.type){
        // case "PLUSSCORE":
        //     let _state = _.cloneDeep(state)
        //     const id = action.payload.id
        //     const plusScore = action.payload.plusScore
        //     const isSelect = action.payload.isSelect
            
            
        //     if (isSelect === "true"){
        //         _state.questionList[id].isSelect = "false"
        //         _state.totalScore = _state.totalScore - plusScore
        //     }else{
        //         _state.questionList[id].isSelect = "true"
        //         _state.totalScore = _state.totalScore + plusScore
        //     }
        //     return _state;

        // case "CHANGEYADOTYPE":
        //     let e = _.cloneDeep(state)
        //     const isSelectYadoType = action.payload.isSelect

        //     if (isSelectYadoType === "true item"){
        //         e.totalScore = e.totalScore - action.payload.yadoScore
        //     }else{
        //         e.totalScore = e.totalScore + action.payload.yadoScore
        //     }

        //     return e;
            
        default:
            return state;
    }


};

export default planData;