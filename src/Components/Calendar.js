import React from 'react'
import moment from 'moment'


class Calendar extends React.Component{

    state = {
        dateObject: moment(),
        showTitle: false
    }
    
    weekdayshort = moment.weekdaysShort();
    
    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject
        let firstDay = moment(dateObject)
        .startOf("month")
        .format("d");
        return firstDay
    }

    currentDay = () => {
        return this.state.dateObject.format("D")
    }
    
    month = () => {
        return this.state.dateObject.format("MMMM")
    }

    
    weekdayShortName = () => {
        let weekdayNames = this.weekdayshort.map(day => {
                return (
                    <th key={day} className="week-day">
                        {day}
                    </th>
                )
        })
        return weekdayNames
    } 

    blanksBeforeFirst = () => {
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++){
            blanks.push(
                <td className='calendar-day empty'>{''}</td>
                )
        }
        return blanks
    }
        
    calendarDays = () => {
        // Change class on all days that have a todo and add event listener
        let daysInMonthArr = [];
        for (let d = 1; d <= this.state.dateObject.daysInMonth(); d++){
            let dalyTodo = this.props.todos.map(todo => {
                if (todo.due_date.split('-')[2] == d && todo.due_date.split('-')[1] == this.state.dateObject.format('MM')){
                    return <li className='calendar-todo'>{todo.title}</li>
                }
            })
            
            let currentDay = (d == this.currentDay() ? 'Today' : '');
            daysInMonthArr.push(
                <td 
                    key={d} 
                    className={`calendar-day ${currentDay}`}
                    onClick={ this.handleHover }
                    >
                    {d}
                    <ul>
                    {this.state.showTitle ? dalyTodo : null}
                    </ul>
                </td>
            )
        }
        return daysInMonthArr   
    }

    fullCalendar = () => {
        
        var totalSlots = [...this.blanksBeforeFirst(), ...this.calendarDays()];
        let rows = [];
        let cells = [];
        
        totalSlots.forEach((row, i) => {
            if ( i % 7 !== 0 ) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row)
            }
    
            if ( i === totalSlots.length - 1 ){
                rows.push(cells);
            }
        })
    
        let daysinmonth = rows.map((d, i) => {
            return <tr>{d}</tr>;
        })

        return daysinmonth
    }

    handleHover = () => {
        this.setState({
            showTitle: !this.state.showTitle
        })

    }
    
    render(){
        return(
            <div className="calendar-total">
                <div className="calendar-table">
                    <table>
                        <thead>
                            {this.weekdayShortName()}
                        </thead>
                        <tbody>
                            {this.fullCalendar()}
                        </tbody>
                    </table>
                </div>
                <div className="tail-datetime-calendar">
                    <div className='calendar-navi'></div>
                </div>
            </div>
        )
    }
}

export default Calendar