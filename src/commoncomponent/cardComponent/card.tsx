import { FC } from "react";
import "./index.scss";
const Card:FC = ()=>{
    return(
        <div className="card-header">
            <div className="card-image">
                <img src="https://s3-alpha-sig.figma.com/img/8ef1/1021/46a82ab4161a28047f59741b4350bbdf?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LhI7CTFsQBpwLVr3mXtBgVK8oO5dYou-QqRNixC~mA03hbUb9Q3pqTJN98x~XkOBM7trZHszLJz0NnPVcfB1tVq~2qaycCMHo8SvkCgUI33ZgIwD6uKSaQb2H86VBR9C9qdPtXWele2fMYspqwbKO3Ap-yZ-35Yjj~avH5gkB5cFB6dVlNdWmA~X3oEBMBSupKmFP~uYJvkHK7S~poVrfvSGFIhpJUDsZtF3X8KgS4QgNYP7vveTpw0UwIIMkcNA-og927wBeMCjC1j5zGZsdn7jtr4lV8vPmzr2b8QcQsW89jcWrNqp4vyS8JI8jBen6n8wk~Gz-6qxEaB7BKGOog__" alt="" />
            </div>
            <div className="card-content">
                <div className="date">
                    <div className="month">APR</div>
                    <div className="date">06</div>
                </div>
                <div className="content">
                    <div className="header">
                    Wonder Girls 2010 Wonder Girls World Tour San Francisco 
                    </div>
                    <div className="text">
                    We’ll get you directly seated and inside for you to enjoy the show.
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Card;