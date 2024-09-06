let player;
let videoDuration = 0;

// Function to initialize YouTube IFrame API player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'MDLn5-zSQQI',  // Updated with your video ID
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// When the player is ready
function onPlayerReady(event) {
    videoDuration = player.getDuration();  // Get video duration
    updateProgress();  // Start updating progress
}

// Function to track the video state
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        updateProgress();
    }
}

// Function to update the progress bar and percentage
function updateProgress() {
    if (player && player.getCurrentTime) {
        const currentTime = player.getCurrentTime();
        const progress = (currentTime / videoDuration) * 100;

        // Update the progress bar width
        document.getElementById('progress-bar').style.width = `${progress}%`;

        // Update the percentage text
        document.getElementById('progress-percentage').textContent = `Progress: ${Math.floor(progress)}%`;

        // Keep updating the progress every second if the video is still playing
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            setTimeout(updateProgress, 1000);
        }
    }
}


// Initialize course progress in localStorage if not already set
function initializeProgress() {
    const courses = ['course1', 'course2', 'course3'];
    const courseDetails = {
        'course1': { totalChapters: 3, totalQuizzes: 2 },
        'course2': { totalChapters: 4, totalQuizzes: 3 },
        'course3': { totalChapters: 5, totalQuizzes: 4 }
    };

    courses.forEach(course => {
        if (!localStorage.getItem(course)) {
            const progress = {
                time: 0,
                chaptersCompleted: 0,
                quizzesCompleted: 0
            };
            localStorage.setItem(course, JSON.stringify(progress));
        }
    });
}

// Update progress in localStorage
function updateProgress(courseId, timeSpent = 0, chapterCompleted = false, quizCompleted = false) {
    let progress = JSON.parse(localStorage.getItem(courseId));

    if (timeSpent) {
        progress.time += timeSpent;
    }
    if (chapterCompleted) {
        progress.chaptersCompleted += 1;
    }
    if (quizCompleted) {
        progress.quizzesCompleted += 1;
    }

    localStorage.setItem(courseId, JSON.stringify(progress));
}

// Calculate progress percentage
function calculateProgress(courseId) {
    const courseDetails = {
        'course1': { totalChapters: 3, totalQuizzes: 2 },
        'course2': { totalChapters: 4, totalQuizzes: 3 },
        'course3': { totalChapters: 5, totalQuizzes: 4 }
    };

    const progress = JSON.parse(localStorage.getItem(courseId));
    const totalChapters = courseDetails[courseId].totalChapters;
    const totalQuizzes = courseDetails[courseId].totalQuizzes;

    const chapterProgress = (progress.chaptersCompleted / totalChapters) * 100;
    const quizProgress = (progress.quizzesCompleted / totalQuizzes) * 100;

    return Math.max(chapterProgress, quizProgress); // Return the highest progress percentage
}

// Load and display course statistics on the statistics page
function loadProgressStats() {
    const courses = ['course1', 'course2', 'course3'];
    const progressStatsDiv = document.getElementById('progress-stats');

    courses.forEach(course => {
        const progressPercentage = calculateProgress(course);
        const courseDiv = document.createElement('div');
        courseDiv.innerHTML = `
            <h3>${course.replace('course', 'Course ')}</h3>
            <p>Progress: ${progressPercentage.toFixed(2)}%</p>
        `;
        progressStatsDiv.appendChild(courseDiv);
    });
}

// Display course details (for demonstration purposes)
function showCourseDetails(courseId) {
    alert('Details for ' + courseId);
}

// Event listener for contact form submission
document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Basic form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('Thank you for your message, ' + name + '!');
    } else {
        alert('Please fill out all fields.');
    }
});

// Initialize progress data on page load
initializeProgress();

// Load course statistics when the statistics page is loaded
if (window.location.pathname.endsWith('statistics.html')) {
    loadProgressStats();
}

// Example usage for course pages:
// In course pages (e.g., course1.html), include the following script to handle chapter and quiz access:

// Simulate accessing chapters and quizzes
document.addEventListener('DOMContentLoaded', () => {
    // Example elements: chapters and quizzes
    document.getElementById('chapters')?.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            // Increase progress when a chapter is accessed
            updateProgress('course1', 0, true, false);
        }
    });

    document.getElementById('practice-sets')?.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            // Increase progress when a quiz is accessed
            updateProgress('course1', 0, false, true);
        }
    });
});
