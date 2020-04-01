import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import List from './List';

function Home(props) {
    const [months] = useState(['January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December']);
    let now = new Date();
    const [finalTotal, setFinalTotal] = useState(0);
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [description, setDescription] = useState('');
    const [value, setValue] = useState();
    const [checkbox, setCheckBox] = useState(false);
    const dispatch = useDispatch();

    const handleDescription = (e) => {
        let valid = false;
        let desc = e;

        if (desc === '') {
            valid = false;
        }
        else {
            valid = true;
        }
        setDescription(desc);
        return valid;
    }

    const handleValue = (e) => {
        let valid = false;
        let value = e;
        let reg = /^[0-9]+$/;

        if (value === '') {
            valid = false;
        }
        else if (!reg.test(value)) {
            valid = false;
        }
        else {
            valid = true;
        }
        setValue(value);
        return valid;
    }

    const validation = () => {
        let valid = false;

        let isDescValid = handleDescription(description);
        let isValueValid = handleValue(value);

        if (!isDescValid) {
            valid = false;
        }
        else if (!isValueValid) {
            valid = false;
        }
        else {
            valid = true;
        }
        return valid;
    }

    const handleSubmit = (e) => {
        let valid = validation();
        if (valid) {
            e.preventDefault();
            if (checkbox === true) {
                setExpenses(Number(expenses) + Number(value));
                setFinalTotal(Number(income) + Number(-Math.abs(Number(expenses) + Number(value))));
            }
            else {
                setIncome(Number(income) + Number(value));
                setFinalTotal(Number(Number(income) + Number(value)) + Number(-Math.abs(expenses)));
            }
            var id = new Date();
            const data = {
                id,
                description,
                value,
                checkbox,
                expenses,
                income,
            }
            dispatch({
                type: 'ADD_DATA', data
            });
            setDescription('');
            setValue('');
        }
    }

    const handleRemove = (post) => {
        if (post.checkbox === true) {
            setExpenses(Number(expenses) - Number(post.value));
            setFinalTotal(Number(finalTotal) + Number(post.value));
        }
        else {
            setIncome(Number(income) - Number(post.value));
            setFinalTotal(Number(finalTotal) - Number(post.value));
        }
        dispatch({
            type: 'DELETE_DATA', id: post.id
        });
    }
    return (
        <React.Fragment >
            <div className="container pt-5" style={{ fontSize: "25px" }}>
                <div className="row justify-content-center">
                    <strong>
                        {months[now.getMonth()] + " " + now.getFullYear()}
                    </strong>
                </div>
                <div className="row justify-content-center">
                    {finalTotal} &nbsp;<i className="fa fa-rupee mt-2"></i>
                </div>
                <div className="row justify-content-center">
                    <strong>Available Budget</strong>
                </div>
                <br />
                <div className="row text-center">
                    <div className="col-4 text-right" style={{ color: "#62c15d" }}>
                        INCOME <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
                        <br />
                        + {income} &nbsp;<i className="fa fa-rupee"></i>
                    </div>
                    <div className="col-4 center mt-3">
                        <label className="switch" style={checkbox === true ? { background: "#d65555", transition: "0.9s" } :
                            { background: "#62c15d", transition: "0.9s" }}>
                            <input type="checkbox" value={checkbox} id="checkbox"
                                onChange={(e) => setCheckBox(!checkbox)} name="checkbox" />
                            <div></div>
                        </label>
                    </div>
                    <div className="col-4 text-left" style={{ color: "#d65555" }}>
                        EXPENSES <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
                        <br />
                        - {expenses} &nbsp;<i className="fa fa-rupee"></i>
                    </div>
                </div>
                <br />
                <br />
                <div className="row justify-content-center ml-1">
                    <div className="col">
                    </div>
                    <div className="col-sm-5">
                        <input type="text" name="Description" id="Description" value={description}
                            onChange={(e) => handleDescription(e.target.value)}
                            className="decription-input form-control"
                            style={checkbox === true ? { borderBottom: "1.5px solid", color: "#d65555", transition: "0.9s" } :
                                { borderBottom: "1.5px solid", color: "#62c15d", transition: "0.9s" }}
                            placeholder="Add Description" />
                    </div>
                    <div className="col-sm-3">
                        <input type="number" name="Value" id="Value" value={value}
                            onChange={e => handleValue(e.target.value)}
                            className="number-input float-right form-control"
                            style={checkbox === true ? { borderBottom: "1.5px solid", color: "#d65555", transition: "0.9s" } :
                                { borderBottom: "1.5px solid", color: "#62c15d", transition: "0.9s" }}
                            placeholder="Value" />
                    </div>
                    <div className="col-sm-2">
                        <i className="fa fa-check mt-2" type="" value="submit"
                            style={checkbox === true ? { color: "#d65555", transition: "0.9s", fontSize: "25px" } :
                                { color: "#62c15d", transition: "0.9s", fontSize: "25px" }}
                            onClick={handleSubmit}></i>
                    </div>
                </div>
                <br /><br /><br />
                <List state={props.posts} updateData={handleRemove} />
            </div>
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(Home);
