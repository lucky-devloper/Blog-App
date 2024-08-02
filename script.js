// Elements for file selection and image preview
const labletag = document.querySelector(".image-lable");
const selectfile = document.getElementById('image');
const imgPreview = document.getElementById('picture');
const blogTitle = document.getElementById("title")
const addImageIcon = document.querySelector("#add-img-icon");
const Content = document.getElementById("content");
const SaveBtn = document.getElementById("saveBtn");


const blogSection = document.querySelector(".blog-section")
const cardContainer = document.querySelector(".left")
const notification = document.querySelector(".notification-Container")
const mainSection = document.querySelector(".main-section")

const blogfullContent = document.querySelector(".blog-full-content")

document.getElementById("home").addEventListener('click', () => {
    mainSection.classList.remove('hide')
    blogfullContent.classList.add('hide')
})

// Event listener for file selection
selectfile.addEventListener('change', function (event) {
    labletag.classList.add('hide');
    imgPreview.classList.remove('hide');
    addImageIcon.classList.remove('hide');

    const file = event.target.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file); // Create an object URL for the file
        imgPreview.src = objectURL;                 // Use the object URL to preview the image
    }
});

// Event listener to trigger file selection dialog
addImageIcon.addEventListener('click', (e) => {
    selectfile.click();
});

// Elements for content box and control buttons
const contentBox = document.querySelector(".create-blog-section");
const closeBtn = document.getElementById("close-bar");
const Openbtn = document.getElementById("open-bar");

// Event listener to open the content box
Openbtn.addEventListener('click', () => {
    contentBox.classList.remove('hide');
});

// Event listener to close the content box and reset fields
closeBtn.addEventListener('click', () => {
    contentBox.classList.add('hide');
    Content.value = "";          // Clear the content input
    imgPreview.src = "";         // Clear the image preview
    selectfile.value = "";       // Reset the file input value
    blogTitle.value = "";        // Clear the title input
    labletag.classList.remove('hide');
    addImageIcon.classList.add('hide');
});

const data = JSON.parse(localStorage.getItem("AllData"))
if (data) {
    document.addEventListener('DOMContentLoaded', displayBlogItem)
}
if (data) {
    blogSection.classList.remove('hide')
}

let arrData = JSON.parse(localStorage.getItem("AllData")) || []

SaveBtn.addEventListener('click', newblogcreate)
function newblogcreate(){
    const blogData = {
        image: imgPreview.src,
        blogTitle: blogTitle.value,
        blogContent: Content.value,
        date: new Date()
    }
    arrData.push(blogData)
    localStorage.setItem("AllData", JSON.stringify(arrData))
    displayBlogItem()
    blogSection.classList.remove('hide')
    closeBtn.click()
    window.location.reload()
}

function displayBlogItem() {
    const data = JSON.parse(localStorage.getItem("AllData"))
    let clutter = "";
    let clutter2 = ""
    data.forEach((item) => {
        let publishDate = new Date(item.date)
        clutter += `<div class="blog-card bg-white w-[270px] p-4 rounded shadow-lg" id="${item.date}">
            <div class="card-image">
              <img
                src="${item.image}"
                alt="">
            </div>
            <h2 class="blog-card-title my-3 font-semibold">${item.blogTitle}</h2>
            <div class="profile">
              <i class="fa-solid fa-user"></i>
              <p>Darrel Ethrington</p>
            </div>
            <div class="publish-date">
              <p>Published: ${publishDate.toDateString()}</p>
            </div>
          </div>`

        clutter2 += `<div class="notification">
              <p class="my-2">${item.blogTitle}</p>
              <button>Read now</button>
              <i class="fa-solid fa-arrow-right"></i>
            </div>`
    })
    cardContainer.innerHTML = clutter;
    notification.innerHTML = clutter2;
    ViewBlogDetails()
}


function ViewBlogDetails() {
    const blogCard = cardContainer.querySelectorAll(".blog-card")
    const data = JSON.parse(localStorage.getItem("AllData"))
    blogCard.forEach((item) => {
        item.addEventListener('click', (e) => {
            mainSection.classList.add('hide')
            blogfullContent.classList.remove('hide')
            const selectedID = item.id
            data.forEach((item2) => {
                if (item2.date == selectedID) {
                    displaysummmary(item2)
                }
            })
        })
    })
}


function displaysummmary(summary) {
    blogfullContent.innerHTML = `<div class="summery-section" id="${summary.date}">
        <div class="poster">
          <img src="${summary.image}" alt="" class="h-[350px] w-[100%] object-cover">
        </div>
        <h1 class="poster-title text-xl font-sans font-semibold w-[80%] my-4">${summary.blogTitle}</h1>
        <p>${summary.blogContent}</p>
        <button class="delbtn px-2 mt-2 rounded bg-red-500 text-white float-right">Delete</button>
        <button class="editbtn px-2 mt-2 rounded bg-green-400 text-white">Edit</button>
      </div>`

    deleteblogdata()
    editblogdata()
}

function deleteblogdata() {
    const delButton = blogfullContent.querySelector(".delbtn")
    const data = JSON.parse(localStorage.getItem("AllData"))
    delButton.addEventListener('click', (e) => {
        const selectedId = e.target.parentElement.id
        const filtereddata = data.filter(item => item.date != selectedId)
        localStorage.setItem("AllData", JSON.stringify(filtereddata))
        blogfullContent.classList.add('hide')
        mainSection.classList.remove('hide')
        displayBlogItem()
    })
}

function editblogdata() {
    const editbtn = blogfullContent.querySelector(".editbtn")
    const data = JSON.parse(localStorage.getItem("AllData"))
    editbtn.addEventListener('click', (e) => {
        const selectedId = e.target.parentElement.id
        console.log(selectedId);
        
        const filtereddata = data.find(item => item.date == selectedId)
        console.log(filtereddata);
        blogfullContent.classList.add('hide')
        mainSection.classList.remove('hide')

        Openbtn.click()
        selectfile.value = "";
        imgPreview.src = filtereddata.image;
        Content.value = filtereddata.blogContent;
        blogTitle.value = filtereddata.blogTitle;

        labletag.classList.add('hide');
        imgPreview.classList.remove('hide');
        addImageIcon.classList.remove('hide');

        arrData = arrData.filter(item => item.date != selectedId);
        console.log(arrData);
        
        localStorage.setItem("AllData", JSON.stringify(arrData));
        displayBlogItem()
    })
    // window.location.reload()
}
