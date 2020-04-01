import React, { useState } from 'react';
import { connect } from 'react-redux';

function List(props) {
    const [focus, setFocus] = useState(false);
    const handleRemove = (post) => {
        setFocus(false)
        props.updateData(post);
    }
    return (
        <React.Fragment>
            {
                props.state.sort((a, b) => a.id < b.id).map(post =>
                    <div className="container" style={{ fontSize: "20px" }} onMouseEnter={(e) => setFocus(focus)} onMouseLeave={(e) => setFocus(!focus)} value={focus}>
                        <div className="row justify-content-center">
                            <p type="text" name="Description"
                                className="decription-input2"
                                placeholder="Add Description">{post.description}</p>
                            <p type="text" name="Value" id="Value"
                                className="number-input2 float-right"
                                style={post.checkbox === true ? { color: "#d65555", transition: "0.6s" } :
                                    { color: "#62c15d", transition: "0.6s" }}
                                placeholder="Value">{post.checkbox === true ? " - " + post.value : " + " + post.value}
                            </p>
                            {focus === true ? <i className="fa fa-remove mt-2" value={post.id}
                                style={{ color: "#d65555", transition: "0.6s", fontSize: "20px" }} onClick={() => handleRemove(post)}
                            ></i> : ""}
                            {/* <i className="fa fa-remove mt-2" value={post.id}
                                style={{ color: "#d65555", transition: "0.6s", fontSize: "20px" }} onClick={() => handleRemove(post)}
                            ></i> */}
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        posts: state
    }
}

export default connect(mapStateToProps)(List);