<template>
  <main>
    <section class="about-section">
      <div class="container">
        <div class="row">
          <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
            <div class="inner-column">
              <div class="sec-title">
                <span class="title">About Nafis To-Do</span>
                <h2>We Are Empowering Productivity</h2>
              </div>
              <div class="text">
                Nafis To-Do is a cutting-edge task management platform designed to help individuals
                and teams stay organized and productive. Since our inception in 2015, we've been
                dedicated to creating innovative tools that simplify the complexities of daily
                tasks. Whether you're managing a personal to-do list or coordinating a large
                project, Nafis To-Do provides a user-friendly interface that allows you to
                effortlessly add, edit, and delete tasks. Our platform is built with the latest
                technology to ensure seamless performance across all devices, making it easy to keep
                track of your responsibilities wherever you are. At Nafis To-Do, we believe that
                productivity is key to success, and our mission is to empower our users with the
                tools they need to achieve their goals efficiently. Join us on our journey to
                transform the way you manage your tasks, and experience the difference that Nafis
                To-Do can make in your life.
              </div>

              <div class="btn-box">
                <a href="#" class="theme-btn btn-style-one">Contact Us</a>
              </div>
            </div>
          </div>

          <!-- Image Column -->
          <div class="image-column col-lg-6 col-md-12 col-sm-12">
            <div class="inner-column wow fadeInLeft">
              <div class="author-desc">
                <h2>Nafis To-Do</h2>
                <span>Increase your productivity</span>
              </div>
              <figure class="image-1">
                <a href="#" class="lightbox-image" data-fancybox="images"
                  ><img
                    title="Nafis To-Do"
                    src="C:\Users\DELL\Desktop\To Do List - Final\src\assets\img\checklist-notebook.jpg"
                    alt=""
                /></a>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  outline: none;
}

a,
a:active,
a:focus {
  color: #6f6f6f;
  text-decoration: none;
  transition-timing-function: ease-in-out;
  -ms-transition-timing-function: ease-in-out;
  -moz-transition-timing-function: ease-in-out;
  -webkit-transition-timing-function: ease-in-out;
  -o-transition-timing-function: ease-in-out;
  transition-duration: 0.2s;
  -ms-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
}

.image-1 img {
  width: 74%; /* Adjust the width as needed */
  height: auto; /* Maintains the aspect ratio */
  max-width: 100%; /* Ensures the image doesn't exceed its container */
  border-radius: 10px; /* Optional: for rounded corners */
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
img {
  max-width: 100%;
  height: auto;
}
section {
  padding: 60px 0;
  /* min-height: 100vh;*/
}

.sec-title {
  position: relative;
  z-index: 1;
  margin-bottom: 60px;
}

.sec-title .title {
  position: relative;
  display: block;
  font-size: 18px;
  line-height: 24px;
  color: #41b883;
  font-weight: 500;
  margin-bottom: 15px;
}

.sec-title h2 {
  position: relative;
  display: block;
  font-size: 40px;
  line-height: 1.28em;
  color: #222222;
  font-weight: 600;
  padding-bottom: 18px;
}

.sec-title h2:before {
  position: absolute;
  content: '';
  left: 0px;
  bottom: 0px;
  width: 50px;
  height: 3px;
  background-color: #d1d2d6;
}

.sec-title .text {
  position: relative;
  font-size: 16px;
  line-height: 26px;
  color: #848484;
  font-weight: 400;
  margin-top: 35px;
}

.sec-title.light h2 {
  color: #ffffff;
}

.sec-title.text-center h2:before {
  left: 50%;
  margin-left: -25px;
}

.list-style-one {
  position: relative;
}

.list-style-one li {
  position: relative;
  font-size: 16px;
  line-height: 26px;
  color: #222222;
  font-weight: 400;
  padding-left: 35px;
  margin-bottom: 12px;
}

.list-style-one li:before {
  content: '\f058';
  position: absolute;
  left: 0;
  top: 0px;
  display: block;
  font-size: 18px;
  padding: 0px;
  color: #ff2222;
  font-weight: 600;
  -moz-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1.6;
  font-family: 'Font Awesome 5 Free';
}

.list-style-one li a:hover {
  color: #44bce2;
}

.btn-style-one {
  position: relative;
  display: inline-block;
  font-size: 17px;
  line-height: 30px;
  color: #ffffff;
  padding: 10px 30px;
  font-weight: 600;
  overflow: hidden;
  letter-spacing: 0.02em;
  background-color: #41b883;
  border-radius: 30px;
}

.btn-style-one:hover {
  background-color: #2c6a4e;
  color: #ffffff;
}
.about-section {
  position: relative;
  padding: 120px 0 70px;
}

.about-section .sec-title {
  margin-bottom: 45px;
}

.about-section .content-column {
  position: relative;
  margin-bottom: 50px;
}

.about-section .content-column .inner-column {
  position: relative;
  padding-left: 30px;
}

.about-section .text {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 26px;
  color: #848484;
  font-weight: 400;
}

.about-section .list-style-one {
  margin-bottom: 45px;
}

.about-section .btn-box {
  position: relative;
}

.about-section .btn-box a {
  padding: 15px 50px;
}

.about-section .image-column {
  position: relative;
}

.about-section .image-column .text-layer {
  position: absolute;
  right: -110px;
  top: 50%;
  font-size: 325px;
  line-height: 1em;
  color: #ffffff;
  margin-top: -175px;
  font-weight: 500;
}

.about-section .image-column .inner-column {
  position: relative;
  padding-left: 80px;
  padding-bottom: 0px;
  margin-bottom: 200px;
}
.about-section .image-column .inner-column .author-desc {
  position: absolute;
  bottom: 16px;
  z-index: 1;
  background: rgb(203, 200, 42);
  padding: 10px 15px;
  left: 96px;
  width: calc(100% - 250px);
  border-radius: 50px;
}
.about-section .image-column .inner-column .author-desc h2 {
  font-size: 21px;
  letter-spacing: 1px;
  text-align: center;
  color: #fff;
  margin: 0;
}
.about-section .image-column .inner-column .author-desc span {
  font-size: 16px;
  letter-spacing: 6px;
  text-align: center;
  color: #fff;
  display: block;
  font-weight: 400;
}
.about-section .image-column .inner-column:before {
  content: '';
  position: absolute;
  width: calc(50% + 80px);
  height: calc(100% + 160px);
  top: -80px;
  left: -3px;
  background: transparent;
  z-index: 0;
  border: 44px solid #41b883;
}

.about-section .image-column .image-1 {
  position: relative;
}
.about-section .image-column .image-2 {
  position: absolute;
  left: 0;
  bottom: 0;
}

.about-section .image-column .image-2 img,
.about-section .image-column .image-1 img {
  box-shadow: 0 30px 50px rgba(8, 13, 62, 0.15);
  border-radius: 46px;
}

.about-section .image-column .video-link {
  position: absolute;
  left: 70px;
  top: 170px;
}

.about-section .image-column .video-link .link {
  position: relative;
  display: block;
  font-size: 22px;
  color: #191e34;
  font-weight: 400;
  text-align: center;
  height: 100px;
  width: 100px;
  line-height: 100px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 30px 50px rgba(8, 13, 62, 0.15);
  -webkit-transition: all 300ms ease;
  -moz-transition: all 300ms ease;
  -ms-transition: all 300ms ease;
  -o-transition: all 300ms ease;
  transition: all 300ms ease;
}

.about-section .image-column .video-link .link:hover {
  background-color: #191e34;
  color: #fff;
}
</style>
