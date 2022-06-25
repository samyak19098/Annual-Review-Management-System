import React from "react";
import InternalReviewerForm from "./InternalReviewerForm";
import ExternalReviewerForm from "./ExternalReviewerForm";

function ReviewerForm(props) {
    let element = (
            <ExternalReviewerForm {...props}/>
    )
    if(props.user.role != 'reviewer') {
        element = (
            <InternalReviewerForm {...props}/>
        );
    }
    return element;
}

export default ReviewerForm;