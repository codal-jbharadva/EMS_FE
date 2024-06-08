import { FC, useEffect, useState } from "react"
import "./index.scss"
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import PostCard from "../blogCard/BlogCard";
import { apiRequest } from "../../utils/ApicallUtil";
import { useNavigate } from "react-router-dom";


const Blog:FC =()=>{
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await apiRequest('blog/',"GET");
                setBlogs(response.data.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchData();
    },[]);
    return(
        <ContentWrapper>
            <div className="blog">
                <header>Blog</header>
                <p>Here are some of the amazing blogs written by EventTick community.</p>
                {!blogs? (
                    <div>
                        No Blogs Found
                    </div>
                ):(
                    <div className="cards">
                        {blogs.map((blog)=>(
                            <div onClick={()=> navigate(`/blogdetail/${blog?.id} `)}>
                                <PostCard data= {blog}/>
                            </div>
                        ))}
                    </div>
                )}
                
            <div className="btndiv">
                <button className="morebtn"><p>Load More</p></button>
            </div>
            </div>

        </ContentWrapper>
    )
}

export default Blog;