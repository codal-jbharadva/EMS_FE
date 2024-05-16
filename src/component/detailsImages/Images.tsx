import "./index.scss"
import Img from "../../commoncomponent/lazyLoadImage/LazyLoadImage";

const images: string[] = ["https://s3-alpha-sig.figma.com/img/8ef1/1021/46a82ab4161a28047f59741b4350bbdf?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LhI7CTFsQBpwLVr3mXtBgVK8oO5dYou-QqRNixC~mA03hbUb9Q3pqTJN98x~XkOBM7trZHszLJz0NnPVcfB1tVq~2qaycCMHo8SvkCgUI33ZgIwD6uKSaQb2H86VBR9C9qdPtXWele2fMYspqwbKO3Ap-yZ-35Yjj~avH5gkB5cFB6dVlNdWmA~X3oEBMBSupKmFP~uYJvkHK7S~poVrfvSGFIhpJUDsZtF3X8KgS4QgNYP7vveTpw0UwIIMkcNA-og927wBeMCjC1j5zGZsdn7jtr4lV8vPmzr2b8QcQsW89jcWrNqp4vyS8JI8jBen6n8wk~Gz-6qxEaB7BKGOog__",
"https://s3-alpha-sig.figma.com/img/8ef1/1021/46a82ab4161a28047f59741b4350bbdf?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LhI7CTFsQBpwLVr3mXtBgVK8oO5dYou-QqRNixC~mA03hbUb9Q3pqTJN98x~XkOBM7trZHszLJz0NnPVcfB1tVq~2qaycCMHo8SvkCgUI33ZgIwD6uKSaQb2H86VBR9C9qdPtXWele2fMYspqwbKO3Ap-yZ-35Yjj~avH5gkB5cFB6dVlNdWmA~X3oEBMBSupKmFP~uYJvkHK7S~poVrfvSGFIhpJUDsZtF3X8KgS4QgNYP7vveTpw0UwIIMkcNA-og927wBeMCjC1j5zGZsdn7jtr4lV8vPmzr2b8QcQsW89jcWrNqp4vyS8JI8jBen6n8wk~Gz-6qxEaB7BKGOog__",
"https://s3-alpha-sig.figma.com/img/8ef1/1021/46a82ab4161a28047f59741b4350bbdf?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LhI7CTFsQBpwLVr3mXtBgVK8oO5dYou-QqRNixC~mA03hbUb9Q3pqTJN98x~XkOBM7trZHszLJz0NnPVcfB1tVq~2qaycCMHo8SvkCgUI33ZgIwD6uKSaQb2H86VBR9C9qdPtXWele2fMYspqwbKO3Ap-yZ-35Yjj~avH5gkB5cFB6dVlNdWmA~X3oEBMBSupKmFP~uYJvkHK7S~poVrfvSGFIhpJUDsZtF3X8KgS4QgNYP7vveTpw0UwIIMkcNA-og927wBeMCjC1j5zGZsdn7jtr4lV8vPmzr2b8QcQsW89jcWrNqp4vyS8JI8jBen6n8wk~Gz-6qxEaB7BKGOog__",
"https://s3-alpha-sig.figma.com/img/8ef1/1021/46a82ab4161a28047f59741b4350bbdf?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LhI7CTFsQBpwLVr3mXtBgVK8oO5dYou-QqRNixC~mA03hbUb9Q3pqTJN98x~XkOBM7trZHszLJz0NnPVcfB1tVq~2qaycCMHo8SvkCgUI33ZgIwD6uKSaQb2H86VBR9C9qdPtXWele2fMYspqwbKO3Ap-yZ-35Yjj~avH5gkB5cFB6dVlNdWmA~X3oEBMBSupKmFP~uYJvkHK7S~poVrfvSGFIhpJUDsZtF3X8KgS4QgNYP7vveTpw0UwIIMkcNA-og927wBeMCjC1j5zGZsdn7jtr4lV8vPmzr2b8QcQsW89jcWrNqp4vyS8JI8jBen6n8wk~Gz-6qxEaB7BKGOog__"]
function Images() {
    return (
        <>
            <div className="images-header">
                <div className="header">Photos(10)</div>
                <div><a href="">See All</a></div>
            </div>
            <div className="images">
                {images.map((element)=>(
                    <Img src={element}/>
                ))}
            </div>
        </>
    );
}

export default Images;