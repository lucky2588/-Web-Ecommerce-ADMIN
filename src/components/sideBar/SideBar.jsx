import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetInfoQuery } from '../../app/service/infoApi';
import { useGetLastIdOfBlogsQuery } from '../../app/service/blogApi';
import { useSelector } from 'react-redux';

function SideBar() {
  const { auth, isAuthenticated } = useSelector((state) => state.auth)
  const { data, isLoading } = useGetInfoQuery();
 
  const [iconUser, setIconUser] = useState(true);
  const [iconOrder, setIconOrder] = useState(true);
  const [iconBlog, setIconBlog] = useState(true);
  const [iconProduct, setIconProduct] = useState(true);
  const [iconEmail, setIconEmail] = useState(true);


  const roles = auth.roles.map((role) => role.name);
  const showRole = (authRoles, requireRoles) => {
    return authRoles.some((role) => requireRoles.includes(role));
  };
  const isShowMenu = (authRoles, requireRoles) => {
    return authRoles.some((role) => requireRoles.includes(role));
  };
  function toggleCollapse(id) {
    if (id === "user-nav") {
      setIconUser(!iconUser)
    }
    if (id === "order-nav") {
      setIconOrder(!iconOrder)
    }

    if (id === "blog-nav") {
      setIconBlog(!iconBlog)
    }

    if (id === "product-nav") {
      setIconProduct(!iconProduct)
    }
    if (id === "email-nav") {
      setIconEmail(!iconEmail)
    }
    const element = document.getElementById(id);
    element.classList.toggle('show');
  }
  return (
    <>
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          {
            showRole(roles, ["ADMIN"]) && (
              <>
                <li className="nav-item">
                  <Link className="nav-link " to={"/admin"}>
                    <i className="bi bi-grid" />
                    <span>Dashboard</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link collapsed" data-bs-toggle="collapse" href="#" onClick={() => toggleCollapse('user-nav')}>
                    <i class="bi-person" /><span>USER</span>
                    {iconUser ? (
                      <i className="bi bi-chevron-down ms-auto" />
                    ) : (
                      <i className="bi bi-chevron-up ms-auto" />
                    )
                    }
                  </a>
                  <ul id="user-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                    <li>
                      <Link to={"user"}>
                        <i className="bi bi-circle" /><span>View User </span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"user/create"}>
                        <i className="bi bi-circle" /><span>Create User</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link collapsed" data-bs-toggle="collapse" href="#" onClick={() => toggleCollapse('order-nav')}>
                    <i className="bi-cash-coin" /><span>ORDER</span>
                    {iconOrder ? (
                      <i className="bi bi-chevron-down ms-auto" />
                    ) : (
                      <i className="bi bi-chevron-up ms-auto" />
                    )
                    }
                  </a>
                  <ul id="order-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                    <li>
                      <Link to={"order"}>
                        <i className="bi bi-circle" /><span>View List Order </span>
                      </Link>
                    </li>
                    <li>
                      <a href="tables-data.html">
                        <i className="bi bi-circle" /><span>View Table</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            )
          }
          {
            showRole(roles, ["ADMIN", "AUTHOR"]) && (
              <>
                <li className="nav-item">
                  <a className="nav-link collapsed" data-bs-toggle="collapse" href="#" onClick={() => toggleCollapse('blog-nav')}>
                    <i class="bi-book-half" /><span>BLOG</span>
                    {iconBlog ? (
                      <i className="bi bi-chevron-down ms-auto" />
                    ) : (
                      <i className="bi bi-chevron-up ms-auto" />
                    )
                    }
                  </a>
                  <ul id="blog-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                    {
                      showRole(roles, ["ADMIN"]) && (
                        <>
                          <li>
                            <Link to={"Own-blog"}>
                              <i className="bi bi-circle" /><span> Vỉew List Blog </span>
                            </Link>
                          </li>
                        </>
                      )

                    }

                    <li>
                      <Link to={`Own-blog/create`}>
                        <i className="bi bi-circle" /><span>Create Blog</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </>

            )
          }


          {
            showRole(roles, ["ADMIN"]) && (
              <>
                <li className="nav-item">
                  <a className="nav-link collapsed" data-bs-toggle="collapse" href="#" onClick={() => toggleCollapse('product-nav')}>
                    <i class="bi-server" /><span>PRODUCT</span>
                    {iconProduct ? (
                      <i className="bi bi-chevron-down ms-auto" />
                    ) : (
                      <i className="bi bi-chevron-up ms-auto" />
                    )
                    }
                  </a>
                  <ul id="product-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                    <li>
                      <Link to={"Own-product"}>
                        <i className="bi bi-circle" /><span>View List Product</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"Own-product/create"}>
                        <i className="bi bi-circle" /><span>Create Product</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link collapsed" data-bs-toggle="collapse" href="#" onClick={() => toggleCollapse('email-nav')}>
                    <i class="bi-envelope"></i> <span>EMAIL</span>
                    {iconEmail ? (
                      <i className="bi bi-chevron-down ms-auto" />
                    ) : (
                      <i className="bi bi-chevron-up ms-auto" />
                    )
                    }
                  </a>
                  <ul id="email-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                    <li>
                      <Link to={"email"}>
                        <i className="bi bi-circle" /><span>List Email</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"email/create"}>
                        <i className="bi bi-circle" /><span>Send Email</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link collapsed" to={"category"}>
                    <i class="bi-list-ol"></i>
                    <span>CATEGORY</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link collapsed" to={"brand"}>
                    <i class="bi-bookmark-check"></i>
                    <span>BRAND</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link collapsed" to={"/admin/notification"}>
                    <i class="bi-globe"></i>
                    <span>Notification</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link collapsed" href="pages-faq.html">
                    <i class="bi-chat-square-dots"></i>
                    <span>COMMENTS</span>
                  </a>
                </li>
              </>
            )
          }






          <li className="nav-heading">Pages</li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="users-profile.html">
              <i className="bi bi-person" />
              <span>Profile</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-faq.html">
              <i className="bi bi-question-circle" />
              <span>F.A.Q</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-contact.html">
              <i className="bi bi-envelope" />
              <span>Contact</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-login.html">
              <i className="bi bi-box-arrow-in-right" />
              <span>Login</span>
            </a>
          </li>


        </ul>
      </aside>








    </>
  )
}

export default SideBar