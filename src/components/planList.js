import React from 'react'
import '../styles/PlanList.scss';


export default class Planist extends React.Component {

    render(){

        const {planList,changeScore} = this.props
        const plans = planList.map(plan=>{
            return <li  
                        onClick={()=>{changeScore(plan.id)}}
                        className = "plan"
                        key={plan.id}
                    >
                    {plan.title}:  {plan.userName}:  {plan.sentence}
                    </li>
        })

        return (
            <div className='plan-list-wrap'>
                {/* <h2 className="total-socre">プランリスト</h2> */}
                <ul className='plan-list'>{plans}</ul>
            </div>
            )
    }
  }


