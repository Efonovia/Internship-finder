import React from 'react';
import "../styles/review.css"
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


function Reviews(props) {
    const [starCount, setStarCount] = React.useState(0)
    const [reviewText, setReviewtext] = React.useState("")
    const [allReviews, setAllReviews] = React.useState(props.reviews)

    function onStarClick(starNum) {
        if(starNum === starCount) {
            setStarCount(0)
        } else {
            setStarCount(starNum)
        }
    }

    function handleReviewChange(event) {
        setReviewtext(event.target.value)
    }

    function postReview() {
        if(!starCount) {
            alert("make sure to give the company a rating")
            return
        }
        if(!reviewText) {
            alert("make sure to give the company a review")
            return
        }
        console.log(starCount, reviewText)
        const newReview = {
            reviewer: "drake",
            content: reviewText,
            rating: starCount,
            publishDate: new Date(),
        }
    }

    const testReviewsHtml = Array.from({length: 5}, (_, i) => {
        return <div key={i+1} className="reviews-right__item">
        <p style={{textDecoration: "underline"}}>Dave Jones</p>
        <div className="block-tour">
            <span>Date Published: <span style={{"color":"black"}}>yesterday</span></span>
            <span className="stars">Rating
                <StarIcon sx={{color: "gold"}}/>
                <StarIcon sx={{color: "gold"}}/>
                <StarIcon sx={{color: "gold"}}/>
                <StarIcon sx={{color: "gold"}}/>
            </span>
        </div>
        <h5>a very good or very bad place</h5>
    </div>
    })

    return <div className='reviews-holder'>
                    <p className='review-title'>Have you interned here before? Let others know about your experience</p>
                <div style={{width: "95%"}} className="post-review col-md-12">
                    <div className="stars">Give a rating: {Array.from({length: 5}, (_, i) => {
                        return (starCount >= i+1) ?
                        <StarIcon onClick={()=>onStarClick(i+1)} key={i+1} sx={{color: "gold", cursor: "pointer"}}/> :
                        <StarOutlineIcon onClick={()=>onStarClick(i+1)} key={i+1} sx={{color: "gold", cursor: "pointer"}}/>
                    })}
                    </div>
                    <div className="input_field">
                        <textarea
                            style={{resize: "none", padding: "10px"}}
                            name="#"
                            aria-label={reviewText}
                            cols="40"
                            value={reviewText}
                            onChange={event => handleReviewChange(event)}
                            rows="2" placeholder="Leave a review"
                        ></textarea>
                    </div>
                    <div onClick={postReview} className="post-button">Post review</div>
                </div>
                {allReviews.length ? <><p>All reviews for this company</p>
                <div className='all-reviews'>{testReviewsHtml}</div></> : <p>No reviews for this company yet. Be the first one to make one.</p>}
            </div>
}


export default Reviews