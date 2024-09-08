// Example user profile data
const userProfile = {
    name: "John Doe",
    profilePic: "https://example.com/path-to-profile-pic.jpg"
};

// Function to load user profile data
function loadUserProfile() {
    document.getElementById('userName').textContent = userProfile.name;
    document.getElementById('profilePic').src = userProfile.profilePic;
}

// Call the function to load profile data when the page loads
window.onload = function() {
    loadUserProfile();
};

// Overall Progress Donut Chart
const overallProgressCtx = document.getElementById('overallProgressChart').getContext('2d');
const overallProgressChart = new Chart(overallProgressCtx, {
    type: 'doughnut',
    data: {
        labels: ['Completed', 'In Progress', 'Not Started'],
        datasets: [{
            data: [50, 30, 20],
            backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});

// Time Spent Line Chart
const timeChartCtx = document.getElementById('timeChart').getContext('2d');
const timeChart = new Chart(timeChartCtx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Time Spent (hours)',
            data: [1, 2, 1, 3, 2, 4, 5],
            fill: false,
            borderColor: '#4caf50',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Course-Specific Pie Charts
const course1Ctx = document.getElementById('course1Chart').getContext('2d');
const course1Chart = new Chart(course1Ctx, {
    type: 'pie',
    data: {
        labels: ['Completed', 'Remaining'],
        datasets: [{
            data: [60, 40],
            backgroundColor: ['#4caf50', '#e0e0e0'],
        }]
    },
    options: {
        responsive: true,
    }
});

const course2Ctx = document.getElementById('course2Chart').getContext('2d');
const course2Chart = new Chart(course2Ctx, {
    type: 'pie',
    data: {
        labels: ['Completed', 'Remaining'],
        datasets: [{
            data: [40, 60],
            backgroundColor: ['#4caf50', '#e0e0e0'],
        }]
    },
    options: {
        responsive: true,
    }
});
