import React from 'react';
import "../styles/review.css"
import defaultLogo from "../assets/img/post.png"
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { httpPostReview } from '../hooks/requests.hooks';
import { CircularProgress } from '@mui/material';
import { capitalizeWords, formatDate } from '../utils';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Reviews(props) {
    const [starCount, setStarCount] = React.useState(0)
    const [reviewText, setReviewtext] = React.useState("")
    const [allReviews, setAllReviews] = React.useState(props.reviews)
    const [loading, setLoading] = React.useState(false)

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

    async function postReview() {
        try {
            if(!Boolean(props.userInfo)) {
                return
            }
            if(!starCount) {
                alert("make sure to give the company a rating")
                return
            }
            if(!reviewText) {
                alert("make sure to give the company a review")
                return
            }
            setLoading(true)
            console.log(starCount, reviewText)
            const newReview = {
                reviewer: props.userInfo.firstName + " " + props.userInfo.lastName,
                content: reviewText,
                rating: starCount,
                picturePath: props.userInfo.picturePath
            }
            const response = await httpPostReview(newReview, props.companyId)
            console.log(response)
            if(response.ok) {
                setAllReviews(prev => [...prev, response.body])
            }
            setReviewtext("")
            setStarCount(0)
        } catch (error) {
            console.log("failed to post review")
            alert("failed to post review. Try again")
        } finally {
            setLoading(false)
        }
    }

    const testReviewsHtml = allReviews.map(review => {
        return <div key={review.reviewer+"_"+review.publishDate} className="reviews-right__item">
        {Boolean(review.picturePath) ? <img src={`http://localhost:8000/students/pfp/${review.picturePath}`} style={{borderRadius: "50%"}} height={50} width={60} alt="pic"></img> : <AccountCircleIcon sx={{ height: 50, width: 50 }}/>}
        <div className='deets'>
            <p className='reviewer'>{capitalizeWords(review.reviewer)}</p>
            <p>{formatDate(review.publishDate)}</p>
        </div>
        <span style={{color: "black"}} className="stars">Rating: 
        {Array(5).fill().map((_, index) => index < review.rating ? <StarIcon key={index+1} sx={{color: "gold"}}/> : <StarOutlineIcon key={index+1} sx={{color: "gold", cursor: "pointer"}}/>)}
        </span>
        <h5>{review.content}</h5>
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
                    <div style={{backgroundColor: Boolean(props.userInfo) ? "#fb246a" : "grey"}} onClick={postReview} className="post-button">{loading ? <><CircularProgress sx={{color: "white"}} size={20}/>posting...</> : (Boolean(props.userInfo) ? "Post review" : "You have to log in to make a review")}</div>
                </div>
                {allReviews.length ? <><p>All reviews for this company</p>
                <div className='all-reviews'>{testReviewsHtml}</div></> : <p>No reviews for this company yet. Be the first one to make one.</p>}
            </div>
}


export default Reviews