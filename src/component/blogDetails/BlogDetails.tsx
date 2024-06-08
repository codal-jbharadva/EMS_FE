import "./index.scss";
import ContentWrapper from "../../commoncomponent/contentWrapper/contentWrapper";
import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/ApicallUtil";
import { useParams } from "react-router-dom";
import Img from "../../commoncomponent/lazyLoadImage/LazyLoadImage";
import { blogProps, userProps } from "../../types";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<blogProps>();
    const [dataFlag, setDataFlag] = useState(false);
    const [user, setuser] = useState<userProps>();

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiRequest(`blog/${id}`, "GET");
                setBlog(response.data.data);
                setDataFlag(true);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        async function fetchData() {
            try {
                if (blog?.author) {
                    const response = await apiRequest(`user/${blog?.author}`, "GET");
                    console.log(response.data.data);
                    setuser(response.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [blog?.author, dataFlag]);

    if (!blog) {
        return (
            <ContentWrapper>
                <div className="skeleton-header">
                    <div className="skeleton-left">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-description"></div>
                    </div>
                    <div className="skeleton-right">
                        <div className="skeleton skeleton-image"></div>
                    </div>
                </div>
                <div className="skeleton-content">
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                </div>
                <div className="skeleton-userdetail">
                    <div className="skeleton-userimage">
                        <div className="skeleton skeleton-img"></div>
                    </div>
                    <div className="skeleton-usercontent">
                        <div className="skeleton skeleton-username"></div>
                        <div className="skeleton skeleton-userdesc"></div>
                        <div className="skeleton skeleton-userdesc"></div>
                    </div>
                </div>
            </ContentWrapper>
        );
    }

    return (
        <ContentWrapper>
            <div className="blogdetail-header">
                <div className="header-left">
                    <h1 className="blog-title">{blog?.title}</h1>
                    <p className="blog-description">{blog?.description}</p>
                </div>
                <div className="header-right">
                    <Img src={blog?.coverImage} alt="drive image" />
                </div>
            </div>
            <div className="blogDetail-content">
                <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
            </div>
            <div className="userblogdetail">
                <div className="userimage">
                    <img src={user?.profilePhoto} alt="" />
                </div>
                <div className="usercontent">
                    <h2>{user?.name}</h2>
                    <p>{user?.bio}</p>
                </div>
            </div>
        </ContentWrapper>
    );
};

export default BlogDetails;
