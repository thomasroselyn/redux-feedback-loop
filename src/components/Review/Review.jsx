import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {Button, Card, CardContent, CardActions, Typography} from '@material-ui/core';

class Review extends Component {

    handleSubmit = () => {
        //send data to server for storage
        axios.post('/feedback', this.props.feedback)
        .then(response => {
            console.log('feedback submitted')
            //navigate to success page
            this.props.history.push('/success');
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {

        let submitButton;

        if (
            this.props.feedback.feeling
            && this.props.feedback.understanding
            && this.props.feedback.support
            && this.props.feedback.comments
        ) {
            submitButton = 
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={this.handleSubmit}
                >SUBMIT</Button>
        } else {
            submitButton = 
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    disabled
                >INCOMPLETE</Button>
        }

        return (
            <div>
                <Card className="reviewCard">
                    <CardContent>
                        <Typography component="h2" variant="h5" gutterBottom>
                            Review Your Feedback
                        </Typography>
                        <Typography component="p" variant="body2">
                            Feelings: {this.props.feedback.feeling}
                        </Typography>
                        <Typography component="p" variant="body2">
                            Understanding: {this.props.feedback.understanding}
                        </Typography>
                        <Typography component="p" variant="body2">
                            Support: {this.props.feedback.support}
                        </Typography>
                        <Typography component="p" variant="body2">
                            Comments: {this.props.feedback.comments}
                        </Typography>
                    </CardContent>
                    <CardActions className="cardActions">
                        {submitButton}
                    </CardActions>
                </Card>
            </div>
        )
    }
}

const mapRedux = (reduxState) => {
    return {feedback: reduxState.feedbackReducer}
}

export default withRouter(connect(mapRedux)(Review));