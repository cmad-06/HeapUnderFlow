import React from 'react'
import { Field, reduxForm} from 'redux-form'

class CommentForm extends React.Component{
    constructor(props){
        super(props)
    }

    renderField(field){
        return (
            <div className="form-group">
                <label>{field.laber}</label>
                <input className="form-control" type="text" {...field.input} />
            </div>
        )
    }

    render(){
        const { handleSubmit } = props
        return (
            <div id="comments" >
                <form onSubmit={handleSubmit}>
                    <Field label="Add Comment" name="newComment" component={this.renderField}/>
                </form>
                <button type="submit" >Submit</button>
            </div>
        )
    }

}

function validate(values){
    const errors={};

    if ( !values.newComment ){
        errors.title = "Enter a comment!!"
    }

    return errors;
}

export default reduxForm({
    validate,
    form:"PostCommentForm"
})(CommentForm)