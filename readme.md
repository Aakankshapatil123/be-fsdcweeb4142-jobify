# Job Portal Application

This is a Job Portal Appliction that is bulid using React for the frontend and Node.js with Expess for the backend. The application allow user to browse job listing, apply for jobs, and manage their profiles.

# Features

User Featurs:

- User Registation and Login
- Browse Job Listings
- Search and Filter Jobs
- Apply for Jobs
- View Application Status
- User Profile Management

Recruiter Fetures:

- Recruiter Login
- Post Job Listings for company he/she has been assinged to.
- Manage Job Listings( Create, Update, View)
- View Application for Posted Jobs
- Updated Application Status

Admin Login

- Manage Companies (Create, Update, View, Delete)
- Manage Recuiters (Create , Update, view, Delete)
- Assign Recuiters to companies

Sample Company:

```json
{
  "name": "Tech Solitions Inc.",
  "description": "A leading technology solutions provider specializing in software devlopment and IT consulting.",
  "industry": "Information Technology",
  "location": "San Francisco, CA",
  "website": "https://www.techsolutions.com",
  "size": "201-500",
  "foundedYear": 2010
}

```

```json
{
  "name": "Innovatech Ltd.",
  "description": "A cutting-edge technology company focused on innovative solution in AI and machine.",
  "industry": "Artificial Intelligence",
  "location": "New York, NY",
  "website": "https://www.innovatech.com",
  "size": "51-200",
  "foundedYear": 2015
}

```

```json
{
  "name": "Green Energy Corp.",
  "description": "A renewable energy company dedicated to providing sustainable enery solution.",
  "industry": "Renewable Energy",
  "location": "Austin, TX",
  "website": "https://www.greenenergy.com",
  "size": "501-1000",
  "foundedYear": 2008
}

```

```json
{
  "name": "HelthTech Solution.",
  "description": "A helthcare technology company focused on developing innovative medical devices and software.",
  "industry": "Helthcare Technology ",
  "location": "Boston, MA",
  "website": "https://www.helthtechsolution.com",
  "size": "201-500",
  "foundedYear": 2012
}

```

Job Samples:

```json
{
  "title": "Fronted Developer",
  "description": "We are loking skils frontend Developer to join our team. The ideal canditdate will have experince with react and modern web delopment practices",
  "location": "San Francios CA",
  "company": "Tech Solution Inc",
  "salary": {
        "min": 80000,
        "max": 100000
  },
  "jobType": "Full-time",
  "experinceLevel": "Mid",
  "skils": ["javaScript", "React", "HTML", "CSS"],
  "applicationDeadline": "2024-06-30",
}
```


```json
{
  "title": "Data Scientist",
  "description": "Join our team as Data Scientist to work on cutting-edge AI and machine learning projects. Experince with Python and data analysis is required .",
  "location": "Austin TX",
  "company": "Green Energy Crop.",
  "salary": {
    "min": 95000,
    "max": 130000
  },
  "jobType": "Full-time",
  "experinceLevel": "Mid",
  "skils": ["Python", "R", "Machine Learing", "Data Analysis"],
  "postedDate": "2024-08-01"
}
```

```json
{
  "title": "Backend Developer",
  "description": "We are seeking a talented Backend Developer to work on our server-side applications. The candidate should have experince with Node.js and Express.",
  "location": "New York NY",
  "company": "Innovatech Ltd",
  "salary": {
        "min": "90000",
        "max": "120000"
  },
  "jobType": "Full-time",
  "experinceLevel":"Senior",
  "skils": ["Node.js", "Express", "MongoDB", "REST APIs"],
  "applicationDeadline": "2024-07-15"
}
``

```json

{
  "title": "UI/UX Designer",
  "description": "We are seeking a creative UI/UX Designer to design user-friendly intefaces for our web mobile applications . The candidate should have a strong portfolio showcasing their design skils.",
  "location": "Boston MA",
  "company": "HealthTech Solutions",
  "salary": {
        "min": "70000",
        "max": "90000"
  },
  "jobType": "Full-time",
  "experinceLevel": "Mid",
  "skils": ["Adode XD", "Figma", "Sketch", "User Research"],
  "applicationDeadline": "2024-07-20"
}

```