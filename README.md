<!-- This readme was adapated from a template created by Othneil Drew on Github. If you'd like to use this template visit: https://github.com/othneildrew/Best-README-Template -->
<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url] -->
<!-- [![Issues][issues-shield]][issues-url] -->
<!-- [![Stargazers][stars-shield]][stars-url] -->
<!-- [![MIT License][license-shield]][license-url] -->
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->
<!-- [![Forks][forks-shield]][forks-url] -->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="#">
    <img src="#" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">Brief Docx</h3>

  <p align="center">
    Easily create formatted Word Documents!
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/tdo95/brief-docx">View Demo</a>
    ·
    <a href="https://github.com/tdo95/brief-docx/issues">Report Bug</a>
    ·
    <a href="https://github.com/tdo95/brief-docx/issues">Request Feature</a>
  </p>
</div>
<br />


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
      <li><a href="#features">Features</a></li>
        <li><a href="#how-its-made">How Its Made</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <!-- <li><a href="#prerequisites">Prerequisites</a></li> -->
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li>
        <a href="#optimizations">Optimizations</a>
        <ul>
         <li><a href="#future-improvements">Future Improvements</a></li>
         <li><a href="#lessons-learned">Lessons Learned</a></li>
        </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <!-- <li><a href="#contributing">Contributing</a></li> -->
    <!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![# Demo][product-screenshot]](https://github.com/tdo95/brief-docx/)

Brief Docx is a document formating tool that allows you to create and edit document in real time. Documents are generated from a template and populated based on the template structure.

### Features
- Sign up for account and view document catalog
- Add and remove summary information
- Move summary information to different sections
- Hyperlink references and sources
- Automatically formats text to appropriate font, size, and spacing in document
- Duplication Detection: warn if summary has already been entered
- Text cleaning: remove filler text in brackets/parenthesis
- Saves changes within database - revisit documents at any time

### How Its Made

The application is built with the following technologies:

 [![HTML][HTML5]][HTML5-url]
 [![CSS][CSS3]][CSS3-url]
 [![JavaScript][Javascript]][Javascript-url]
 [![Node][Node.js]][Node.js-url]
 [![Express][Express.js]][Express.js-url]
 [![React][React.js]][React-url]
 [![React Router][React-Router]][React-Router-url]
 [![MongoDB][MongoDB]][MongoDB-url]
 [![Mongoose][Mongoose]][Mongoose-url]


 Libraries
 - Material UI
 - React Load Spinner
 - React PDF
 - File Saver
 - History
 - Passport
 - Docx Template
 - Docx PDF
 - Bycrypt
 
<br><br>

<!-- GETTING STARTED -->
## Getting Started

If you would like to use Brief Docx online, visit [#](#). 

To get a local copy of the application up and running follow these simple example steps.

<!-- ### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ``` -->

### Installation

_Follow the steps below to set up the application locally._

1. Clone the repo
   ```sh
   git clone #
   ```
2. Install NPM packages in the root folder and within the client folder
   ```sh
   npm install
   ```
3. Create a tmp folder at the root
   ```sh
   /tmp 
   ```

### Usage

1. To start the server, run the following command
   ```sh
    npm run dev  
   ```
2. Navigate to the application using the url below
   ```sh
   "localhost:3000"
   ```


<!-- OPTIMIZATIONS -->
## Optimizations
- Allow users to create/upload their own document templates
  - This would require third party file storage. Users can fill out a form to define the variables within the template. The values within the form can be use to dynamically create the form component needed to edit a document generated from the template.
- Incorporate grammerly or some similar api for writing assistance
- Add support for document sharing on various social medias and through email
### Future Improvements

- There is some latency loading the pdf in the display modal on dashboard. The reasoning for this is 3-fold
    1. I am generating the pdf on the server which takes time (on avg 1,500ms)
    2. I am then reading the return pdf file as URL so it it can be passed into react-pdf’s document viewer. This is an asynchronous process and takes some time.
    3. I am using the same document viewer to render multiple different files while mounting and unmounting the component. This causes weird rendering behavior as the previous file will be loaded briefly before the current new one is shown. This flashing behavior isnt ideal for UX and can only be prevented by hiding the document viewer behind a loading screen until the final file has loaded. (edit: This may be intentially implemented by maintainer, see last reference)
    
    The potential solutions that I am considering for this issue are:
    
    1. Storing pdf and word files of the document within some third party cloud service (eg AWS 3, cloudinary) and saving the url references to those files in the database. This way I can avoid having to regenerate the pdf and read it as url, and just pass the cloud service url instead.
        - I could also convert the buffer into a base 64 string and store in data base then pass said string into the pdf viewer [https://github.com/wojtekmaj/react-pdf/wiki/Frequently-Asked-Questions#how-do-i-load-a-pdf-from-base64](https://github.com/wojtekmaj/react-pdf/wiki/Frequently-Asked-Questions#how-do-i-load-a-pdf-from-base64)
    2. Providing each document card it’s own document viewer. This means that each card will have its own display modal, and so I longer have to worry about rendering multiple different files in one viewer.
    
    I referenced these links when coming to this conclusion:
    
    [https://stackoverflow.com/questions/45314066/store-files-in-mongodb-with-nodejs](https://stackoverflow.com/questions/45314066/store-files-in-mongodb-with-nodejs)
    
    [https://github.com/wojtekmaj/react-pdf/discussions/1212](https://github.com/wojtekmaj/react-pdf/discussions/1212)
    
    [https://github.com/react-pdf-viewer/react-pdf-viewer/issues/389](https://github.com/react-pdf-viewer/react-pdf-viewer/issues/389)
    
    [https://github.com/diegomura/react-pdf-site/pull/91](https://github.com/diegomura/react-pdf-site/pull/91)

- Reduce loading time for document updates in editor
- Use a more accurate docx to pdf converter
- Ensure changes within title always register in document
### Lessons Learned

- Can perform functions on a collection of data within mongoDB documents using the $function aggregation expression. However using the $function operator may slow down performance and should only be used if other pipline operators can not fulfill the needs of your application https://www.mongodb.com/docs/manual/reference/operator/aggregation/function/  https://www.mongodb.com/community/forums/t/how-to-update-an-sub-array-with-map-operation-by-index-in-array/143070/2
- Use text-overflow: ellipis to truncate text that has overflowed the boundaries of it’s container. Other settings like overflow:hidden are required https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/


<!-- ROADMAP -->
## Roadmap

- [ ]  Fix delay in summary fetching when entering the editor→ somehow fetch them before the component loads
- [ ]  Create a hook for modal functions instead of having to import context and create state every time
- [ ]  revisit error and success message states in modal. Are they needed ? or can they be passed by the execution function

<!-- See the [open issues](https://github.com/tdo95/discolist/issues) for a list of proposed features (and known issues). -->


<!-- CONTRIBUTING -->
<!-- ## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->


<!-- CONTACT -->
## Contact

### **Tee O.**
Portfolio: [www.github.com/tdo95](www.github.com/tdo95)
[![Email][email-shield]][email-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- Ready-Made Badges: https://github.com/Ileriayo/markdown-badges -->
[contributors-shield]: https://img.shields.io/github/contributors/tdo95/discolist.svg?style=for-the-badge
[contributors-url]: https://github.com/tdo95/discolist/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tdo95/discolist.svg?style=for-the-badge
[forks-url]: https://github.com/tdo95/discolist/network/members
[stars-shield]: https://img.shields.io/github/stars/tdo95/discolist.svg?style=for-the-badge
[stars-url]: https://github.com/tdo95/discolist/stargazers
[issues-shield]: https://img.shields.io/github/issues/tdo95/discolist.svg?style=for-the-badge
[issues-url]: https://github.com/tdo95/discolist/issues
[license-shield]: https://img.shields.io/github/license/tdo95/discolist.svg?style=for-the-badge
[license-url]: https://github.com/tdo95/discolist/blob/master/LICENSE.txt

<!-- SOCIALS BADGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/tee-o
[twitter-shield]: https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white
[twitter-url]: https://twitter.com/teeintech
[email-shield]: https://img.shields.io/badge/tdopress@gmail.com-000000?style=for-the-badge&logo=gmail&logoColor=white
[email-url]: mailto:tdopress@gmail.com

<!-- DEMO IMAGE -->
<!-- EXAMPLE: [product-screenshot]: /discolist-demo.gif -->
[product-screenshot]: /client/public/bf-demo-fast.gif

<!-- LIBRARIES BADGES -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Glossary/HTML5
[JavaScript]: https://img.shields.io/badge/javascript-090909.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[Javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[Node.js]: https://img.shields.io/badge/node.js-333333?style=for-the-badge&logo=node.js&logoColor=44883e
[Node.js-url]: https://nodejs.org/en/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express.js-url]: https://expressjs.com/
[React-Router]: https://img.shields.io/badge/React%20Router-ff0000?style=for-the-badge&logo=react&logoColor=ffffff
[React-Router-url]: https://reactrouter.com/en/main
[Mongoose]: https://img.shields.io/badge/Mongoose-911f19?style=for-the-badge&logo=mongoose&logoColor=ffffff
[Mongoose-url]: https://mongoosejs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-224a12?style=for-the-badge&logo=mongodb&logoColor=ffffff
[MongoDB-url]: https://www.mongodb.com/

<!-- EXTRAS -->
<!-- # Edit these as needed -->
[Spotify-api]: https://img.shields.io/badge/Spotify%20API-000000?style=for-the-badge&logo=spotify&logoColor=1DB954
[Spotify-url]: https://developer.spotify.com/documentation/web-api/quick-start/ 

