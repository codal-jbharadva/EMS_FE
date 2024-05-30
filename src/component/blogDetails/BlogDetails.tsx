import "./index.scss";
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/ApicallUtil";
import { useParams } from "react-router-dom";
import ImageComponent from "../../commoncomponent/imagecompoenent/image";
const BlogDetails = ()=>{

    const {id} = useParams();
    const [blog, setBlog] = useState();
    const [dataFlag, setDataFlag] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await apiRequest(`blog/${id}`,"GET");
                console.log(response.data.data)
                setBlog(response.data.data);
                setDataFlag(true)
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[])

    useEffect(()=>{
        async function fetchData(){
            try{
                if(blog?.author && blog){
                    console.log(blog.author)
                    const response = await apiRequest(`user/${blog?.author}`,"GET");
                    console.log("auther data us ", response)
                    console.log(response)
                    // setBlog(response.data.data);
                }
            }
            catch(err){
                console.log(err);
            }
        }
            fetchData();
    },[dataFlag])

    if(!blog){
        return <div>Data is loading...</div>
    }
    return (
        <ContentWrapper>
            <div className="blogdetail-header">
                <div className="header-left">
                    <h1 className="blog-title">
                       {blog?.title}
                    </h1>
                    <p className="blog-description">
                       {blog?.description}
                    </p>
                </div>
                <div className="header-right">
                    {/* <img src={image} alt="" /> */}
                    {/* <img src={blog?.coverImage} alt="" /> */}
                    {/* <ImageComponent imageUrl = {blog?.coverImage}></ImageComponent> */}
                    <img src={blog?.coverImage} alt="drive image"/>
                </div>
            </div>
            <div className="blogDetail-content">
                <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </div>
        </ContentWrapper>
    )
}

export default BlogDetails;