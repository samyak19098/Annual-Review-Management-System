import React from "react";
import  FacultyCollectiveReview from "./FacultyCollectiveReview";

function ReviewerForm(props) {
    let element = (
        <FacultyCollectiveReview {...props}/>
    )
    return element;
}

export default ReviewerForm;