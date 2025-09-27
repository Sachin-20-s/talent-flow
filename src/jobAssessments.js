import { v4 as uuidv4 } from "uuid";

export const jobAssessments = [
  // Frontend Developer
  ...[1,2,3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
    jobId: "1",
    title: `Frontend Developer Assessment`,
    sections: [
      {
        title: "Section 1",
        questions: [
          { type: "single-choice", text: "Which is a frontend framework?", required: true, options: ["React", "Angular"], validation: {} },
          { type: "multi-choice", text: "Select valid HTML tags", required: true, options: ["<div>", "<span>"], validation: {} },
          { type: "short-text", text: "Name a CSS framework", required: false, options: [], validation: {} },
          { type: "long-text", text: "Explain responsive design", required: false, options: [], validation: {} },
          { type: "numeric", text: "How many pixels in 1 rem?", required: false, options: [], validation: {} },
        ]
      },
      {
        title: "Section 2",
        questions: [
          { type: "single-choice", text: "What does JSX stand for?", required: true, options: ["JavaScript XML", "Java Syntax Extension"], validation: {} },
          { type: "multi-choice", text: "Select React hooks", required: true, options: ["useState", "useEffect"], validation: {} },
          { type: "short-text", text: "Name a React state management library", required: false, options: [], validation: {} },
          { type: "long-text", text: "Explain virtual DOM", required: false, options: [], validation: {} },
          { type: "numeric", text: "React version released in 2020?", required: false, options: [], validation: {} },
        ]
      },
      {
        title: "Section 3",
        questions: [
          { type: "single-choice", text: "Which is a CSS preprocessor?", required: true, options: ["Sass", "Less"], validation: {} },
          { type: "multi-choice", text: "Select JS data types", required: true, options: ["String", "Boolean"], validation: {} },
          { type: "short-text", text: "Name a JS array method", required: false, options: [], validation: {} },
          { type: "long-text", text: "Describe event delegation in JS", required: false, options: [], validation: {} },
          { type: "numeric", text: "Default z-index value in CSS?", required: false, options: [], validation: {} },
        ]
      },
      {
        title: "Section 4",
        questions: [
          { type: "single-choice", text: "Which HTML element contains the page title?", required: true, options: ["<title>", "<head>"], validation: {} },
          { type: "multi-choice", text: "Select valid JS operators", required: true, options: ["+", "-", "*"], validation: {} },
          { type: "short-text", text: "Name a CSS pseudo-class", required: false, options: [], validation: {} },
          { type: "long-text", text: "Explain flexbox layout", required: false, options: [], validation: {} },
          { type: "numeric", text: "CSS grid has how many areas by default?", required: false, options: [], validation: {} },
        ]
      },
      {
        title: "Section 5",
        questions: [
          { type: "single-choice", text: "Which is used to create React components?", required: true, options: ["function", "class"], validation: {} },
          { type: "multi-choice", text: "Select valid CSS units", required: true, options: ["px", "em", "rem"], validation: {} },
          { type: "short-text", text: "Name a popular frontend testing library", required: false, options: [], validation: {} },
          { type: "long-text", text: "Explain React lifecycle methods", required: false, options: [], validation: {} },
          { type: "numeric", text: "How many stages are in React 18 concurrent mode?", required: false, options: [], validation: {} },
        ]
      },
    ]
  })),

  // Backend Developer
  ...[1,2,3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
    jobId: "2",
    
    title: `Backend Developer Assessment`,
    sections: [
      {
        title: "Section 1",
        questions: [
          { type: "single-choice", text: "Which runtime executes JS on server?", required: true, options: ["Node.js", "Deno"], validation: {} },
          { type: "multi-choice", text: "Select valid HTTP methods", required: true, options: ["GET", "POST", "PUT"], validation: {} },
          { type: "short-text", text: "Name a popular backend framework", required: false, options: [], validation: {} },
          { type: "long-text", text: "Explain RESTful API design", required: false, options: [], validation: {} },
          { type: "numeric", text: "Default port for HTTP?", required: false, options: [], validation: {} },
        ]
      },
      {
        title: "Section 2",
        questions: [
          { type: "single-choice", text: "Which database is NoSQL?", required: true, options: ["MongoDB", "MySQL"], validation: {} },
          { type: "multi-choice", text: "Select valid Node.js modules", required: true, options: ["fs", "http"], validation: {} },
          { type: "short-text", text: "Name a Node.js ORM", required: false, options: [], validation: {} },
          { type: "long-text", text: "Explain middleware in Express.js", required: false, options: [], validation: {} },
          { type: "numeric", text: "Node.js initial release year?", required: false, options: [], validation: {} },
        ]
      },
      {
        title: "Section 3",
        questions: [
          { type: "single-choice", text: "Which is used for authentication?", required: true, options: ["JWT", "OAuth"], validation: {} },
          { type: "multi-choice", text: "Select database types", required: true, options: ["SQL", "NoSQL"], validation: {} },
          { type: "short-text", text: "Name a Node.js testing library", required: false, options: [], validation: {} },
          { type: "long-text", text: "Explain clustering in Node.js", required: false, options: [], validation: {} },
          { type: "numeric", text: "Default MySQL port?", required: false, options: [], validation: {} },
        ]
      },
      {
        title: "Section 4",
        questions: [
          { type: "single-choice", text: "Which protocol is stateless?", required: true, options: ["HTTP", "FTP"], validation: {} },
          { type: "multi-choice", text: "Select valid HTTP status codes", required: true, options: ["200", "404", "500"], validation: {} },
          { type: "short-text", text: "Name a caching tool", required: false, options: [], validation: {} },
          { type: "long-text", text: "Explain event loop in Node.js", required: false, options: [], validation: {} },
          { type: "numeric", text: "How many Node.js timers exist?", required: false, options: [], validation: {} },
        ]
      },
      {
        title: "Section 5",
        questions: [
          { type: "single-choice", text: "Which is a message broker?", required: true, options: ["RabbitMQ", "Redis"], validation: {} },
          { type: "multi-choice", text: "Select backend architectures", required: true, options: ["MVC", "Microservices"], validation: {} },
          { type: "short-text", text: "Name a Node.js deployment platform", required: false, options: [], validation: {} },
          { type: "long-text", text: "Explain REST vs GraphQL", required: false, options: [], validation: {} },
          { type: "numeric", text: "Node.js LTS version in 2024?", required: false, options: [], validation: {} },
        ]
      },
    ]
  })),

  // Fullstack Developer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "3",

  title: `Fullstack Developer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which tech is used for frontend?", required: true, options: ["React", "Node.js"], validation: {} },
        { type: "multi-choice", text: "Select valid backend frameworks", required: true, options: ["Express", "NestJS"], validation: {} },
        { type: "short-text", text: "Name a popular database", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain MVC architecture", required: false, options: [], validation: {} },
        { type: "numeric", text: "How many HTTP methods exist?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is a frontend state management library?", required: true, options: ["Redux", "MongoDB"], validation: {} },
        { type: "multi-choice", text: "Select valid JS data types", required: true, options: ["String", "Boolean", "Number"], validation: {} },
        { type: "short-text", text: "Name a templating engine", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain REST vs GraphQL", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default port for Node.js HTTP server?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which database is NoSQL?", required: true, options: ["MongoDB", "MySQL"], validation: {} },
        { type: "multi-choice", text: "Select valid React hooks", required: true, options: ["useState", "useEffect"], validation: {} },
        { type: "short-text", text: "Name a testing framework for Node.js", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe event loop in Node.js", required: false, options: [], validation: {} },
        { type: "numeric", text: "Latest React major version?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 4",
      questions: [
        { type: "single-choice", text: "Which CSS framework is popular?", required: true, options: ["Tailwind", "Bootstrap"], validation: {} },
        { type: "multi-choice", text: "Select valid HTTP status codes", required: true, options: ["200", "404", "500"], validation: {} },
        { type: "short-text", text: "Name a Node.js package manager", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain CORS in web applications", required: false, options: [], validation: {} },
        { type: "numeric", text: "Number of REST constraints?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 5",
      questions: [
        { type: "single-choice", text: "Which is a version control system?", required: true, options: ["Git", "Docker"], validation: {} },
        { type: "multi-choice", text: "Select frontend testing tools", required: true, options: ["Jest", "Cypress"], validation: {} },
        { type: "short-text", text: "Name a backend deployment platform", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe fullstack CI/CD pipeline", required: false, options: [], validation: {} },
        { type: "numeric", text: "Max requests per second a Node.js server can handle (approx)?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// React Developer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "4",
  title: `React Developer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which is used to manage React state?", required: true, options: ["useState", "useFetch"], validation: {} },
        { type: "multi-choice", text: "Select valid React hooks", required: true, options: ["useEffect", "useContext"], validation: {} },
        { type: "short-text", text: "Name a React routing library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain React component lifecycle", required: false, options: [], validation: {} },
        { type: "numeric", text: "Major React version released in 2020?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is a React state management library?", required: true, options: ["Redux", "Express"], validation: {} },
        { type: "multi-choice", text: "Select valid JSX elements", required: true, options: ["<div>", "<span>", "<header>"], validation: {} },
        { type: "short-text", text: "Name a React UI library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain virtual DOM in React", required: false, options: [], validation: {} },
        { type: "numeric", text: "Number of built-in hooks in React 18?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which is a React side-effect hook?", required: true, options: ["useEffect", "useReducer"], validation: {} },
        { type: "multi-choice", text: "Select valid props types", required: true, options: ["string", "number", "boolean"], validation: {} },
        { type: "short-text", text: "Name a testing library for React", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe React context API", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default number of children props in React element?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 4",
      questions: [
        { type: "single-choice", text: "Which method renders React elements to DOM?", required: true, options: ["ReactDOM.render", "React.render"], validation: {} },
        { type: "multi-choice", text: "Select valid React lifecycle phases", required: true, options: ["Mounting", "Updating", "Unmounting"], validation: {} },
        { type: "short-text", text: "Name a hook for memoization", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain React Suspense and lazy loading", required: false, options: [], validation: {} },
        { type: "numeric", text: "How many concurrent features in React 18?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 5",
      questions: [
        { type: "single-choice", text: "Which is used to create functional components?", required: true, options: ["function", "class"], validation: {} },
        { type: "multi-choice", text: "Select valid CSS-in-JS libraries", required: true, options: ["Styled-components", "Emotion"], validation: {} },
        { type: "short-text", text: "Name a popular React animation library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe error boundaries in React", required: false, options: [], validation: {} },
        { type: "numeric", text: "Approx lines of code for React core library?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Node.js Developer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "5",
  title: `Node.js Developer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which module handles HTTP in Node.js?", required: true, options: ["http", "fs"], validation: {} },
        { type: "multi-choice", text: "Select core Node.js modules", required: true, options: ["path", "os", "events"], validation: {} },
        { type: "short-text", text: "Name a popular Node.js framework", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain event-driven architecture in Node.js", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default port for HTTP server?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is used for package management in Node.js?", required: true, options: ["npm", "pip"], validation: {} },
        { type: "multi-choice", text: "Select valid Node.js data types", required: true, options: ["Buffer", "String", "Number"], validation: {} },
        { type: "short-text", text: "Name a Node.js testing framework", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain non-blocking I/O", required: false, options: [], validation: {} },
        { type: "numeric", text: "Current LTS version of Node.js?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which is a templating engine?", required: true, options: ["EJS", "React"], validation: {} },
        { type: "multi-choice", text: "Select valid Node.js HTTP methods", required: true, options: ["GET", "POST", "PUT", "DELETE"], validation: {} },
        { type: "short-text", text: "Name a popular Node.js ORM", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe middleware in Express.js", required: false, options: [], validation: {} },
        { type: "numeric", text: "Max number of listeners on EventEmitter by default?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 4",
      questions: [
        { type: "single-choice", text: "Which module reads files?", required: true, options: ["fs", "http"], validation: {} },
        { type: "multi-choice", text: "Select valid Node.js process properties", required: true, options: ["process.env", "process.argv"], validation: {} },
        { type: "short-text", text: "Name a Node.js logger library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain clustering in Node.js", required: false, options: [], validation: {} },
        { type: "numeric", text: "How many milliseconds in Node.js setTimeout default?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 5",
      questions: [
        { type: "single-choice", text: "Which method writes data to a file?", required: true, options: ["fs.writeFile", "http.write"], validation: {} },
        { type: "multi-choice", text: "Select valid Node.js streams types", required: true, options: ["Readable", "Writable", "Transform"], validation: {} },
        { type: "short-text", text: "Name a popular Node.js deployment platform", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe error handling in Express.js", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default timeout for HTTP requests in Node.js (ms)?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Python Developer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "6",
  title: `Python Developer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which is a Python web framework?", required: true, options: ["Django", "React"], validation: {} },
        { type: "multi-choice", text: "Select Python data types", required: true, options: ["list", "dict", "tuple"], validation: {} },
        { type: "short-text", text: "Name a Python testing library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain Python decorators", required: false, options: [], validation: {} },
        { type: "numeric", text: "Current stable Python major version?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which module is used for HTTP requests?", required: true, options: ["requests", "http.client"], validation: {} },
        { type: "multi-choice", text: "Select valid Python loops", required: true, options: ["for", "while"], validation: {} },
        { type: "short-text", text: "Name a Python ORM", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe Python generators", required: false, options: [], validation: {} },
        { type: "numeric", text: "How many keywords in Python 3.10?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which is used for virtual environments?", required: true, options: ["venv", "pipenv"], validation: {} },
        { type: "multi-choice", text: "Select valid Python operators", required: true, options: ["+", "-", "*", "/"], validation: {} },
        { type: "short-text", text: "Name a Python package manager", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain Python context managers", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default Python indentation spaces?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 4",
      questions: [
        { type: "single-choice", text: "Which is Python’s built-in data structure?", required: true, options: ["list", "array"], validation: {} },
        { type: "multi-choice", text: "Select valid Python string methods", required: true, options: ["split", "join", "replace"], validation: {} },
        { type: "short-text", text: "Name a Python logging library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain Python exception handling", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default recursion limit in Python?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 5",
      questions: [
        { type: "single-choice", text: "Which is used for testing in Python?", required: true, options: ["unittest", "Jest"], validation: {} },
        { type: "multi-choice", text: "Select valid Python collection types", required: true, options: ["set", "dict", "list"], validation: {} },
        { type: "short-text", text: "Name a Python web scraping library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe Python async/await", required: false, options: [], validation: {} },
        { type: "numeric", text: "Max integer value in Python 3?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Java Developer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "7",
  title: `Java Developer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which is a Java collection?", required: true, options: ["ArrayList", "list"], validation: {} },
        { type: "multi-choice", text: "Select Java access modifiers", required: true, options: ["public", "private", "protected"], validation: {} },
        { type: "short-text", text: "Name a Java testing framework", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain JVM memory management", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default port for Java RMI?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is used for concurrency?", required: true, options: ["Thread", "Runnable"], validation: {} },
        { type: "multi-choice", text: "Select Java primitive types", required: true, options: ["int", "double", "boolean"], validation: {} },
        { type: "short-text", text: "Name a Java build tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe Java exception hierarchy", required: false, options: [], validation: {} },
        { type: "numeric", text: "Major Java version released in 2021?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which is a Java GUI framework?", required: true, options: ["Swing", "React"], validation: {} },
        { type: "multi-choice", text: "Select valid Java loops", required: true, options: ["for", "while", "do-while"], validation: {} },
        { type: "short-text", text: "Name a Java logging library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain Java interfaces vs abstract classes", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default initial capacity of ArrayList?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 4",
      questions: [
        { type: "single-choice", text: "Which is used for dependency injection?", required: true, options: ["Spring", "Hibernate"], validation: {} },
        { type: "multi-choice", text: "Select valid Java keywords", required: true, options: ["class", "static", "final"], validation: {} },
        { type: "short-text", text: "Name a Java web framework", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain Java garbage collection", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default stack size of JVM thread?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 5",
      questions: [
        { type: "single-choice", text: "Which method starts a Java program?", required: true, options: ["main", "start"], validation: {} },
        { type: "multi-choice", text: "Select valid Java exception types", required: true, options: ["Checked", "Unchecked"], validation: {} },
        { type: "short-text", text: "Name a Java persistence library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe Java multithreading issues", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default priority of a Java thread?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Android Developer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "8",
  title: `Android Developer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which language is officially supported for Android?", required: true, options: ["Kotlin", "Python"], validation: {} },
        { type: "multi-choice", text: "Select valid Android components", required: true, options: ["Activity", "Service", "BroadcastReceiver"], validation: {} },
        { type: "short-text", text: "Name an Android UI library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain Android lifecycle", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default min SDK version for Android 11?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is used for layout design?", required: true, options: ["XML", "HTML"], validation: {} },
        { type: "multi-choice", text: "Select valid Android UI elements", required: true, options: ["TextView", "Button", "ImageView"], validation: {} },
        { type: "short-text", text: "Name an Android testing framework", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe intents in Android", required: false, options: [], validation: {} },
        { type: "numeric", text: "Current latest Android API level?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which is for data storage?", required: true, options: ["Room", "Firebase"], validation: {} },
        { type: "multi-choice", text: "Select valid Android threads/APIs", required: true, options: ["AsyncTask", "Handler"], validation: {} },
        { type: "short-text", text: "Name an Android networking library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain Android fragments", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default timeout for Android network requests (ms)?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 4",
      questions: [
        { type: "single-choice", text: "Which layout is flexible for positioning?", required: true, options: ["ConstraintLayout", "LinearLayout"], validation: {} },
        { type: "multi-choice", text: "Select valid Android storage options", required: true, options: ["SharedPreferences", "SQLite", "Room"], validation: {} },
        { type: "short-text", text: "Name a popular Android library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain Android services", required: false, options: [], validation: {} },
        { type: "numeric", text: "Max threads for AsyncTask default?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 5",
      questions: [
        { type: "single-choice", text: "Which is used for dependency injection?", required: true, options: ["Dagger", "Retrofit"], validation: {} },
        { type: "multi-choice", text: "Select valid Android animations APIs", required: true, options: ["ObjectAnimator", "ViewPropertyAnimator"], validation: {} },
        { type: "short-text", text: "Name an Android architecture pattern", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe Android background execution limits", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default max cache size for Glide?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// iOS Developer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "9",
  title: `iOS Developer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which language is primarily used for iOS?", required: true, options: ["Swift", "Java"], validation: {} },
        { type: "multi-choice", text: "Select valid iOS components", required: true, options: ["UIViewController", "AppDelegate", "SceneDelegate"], validation: {} },
        { type: "short-text", text: "Name an iOS UI framework", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain iOS app lifecycle", required: false, options: [], validation: {} },
        { type: "numeric", text: "Current latest Swift version?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is used for layout in iOS?", required: true, options: ["Storyboard", "HTML"], validation: {} },
        { type: "multi-choice", text: "Select valid iOS UI elements", required: true, options: ["UILabel", "UIButton", "UIImageView"], validation: {} },
        { type: "short-text", text: "Name an iOS testing framework", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe iOS delegation pattern", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default iOS app bundle identifier format?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which is used for data persistence?", required: true, options: ["CoreData", "SQLite"], validation: {} },
        { type: "multi-choice", text: "Select valid iOS notification types", required: true, options: ["Local", "Push"], validation: {} },
        { type: "short-text", text: "Name an iOS networking library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain iOS view controller containment", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default max threads in iOS app?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 4",
      questions: [
        { type: "single-choice", text: "Which is used for dependency injection?", required: true, options: ["Swinject", "Alamofire"], validation: {} },
        { type: "multi-choice", text: "Select valid iOS gestures", required: true, options: ["Tap", "Swipe", "Pinch"], validation: {} },
        { type: "short-text", text: "Name a popular iOS animation library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain iOS background execution", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default iOS app refresh interval?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 5",
      questions: [
        { type: "single-choice", text: "Which is used for SwiftUI layouts?", required: true, options: ["VStack", "UIStackView"], validation: {} },
        { type: "multi-choice", text: "Select valid SwiftUI property wrappers", required: true, options: ["@State", "@Binding", "@ObservedObject"], validation: {} },
        { type: "short-text", text: "Name an iOS testing tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe iOS app sandboxing", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default animation duration in SwiftUI (seconds)?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Data Scientist
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "10",
  title: `Data Scientist Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which library is used for data analysis in Python?", required: true, options: ["pandas", "NumPy"], validation: {} },
        { type: "multi-choice", text: "Select valid data visualization libraries", required: true, options: ["matplotlib", "seaborn", "plotly"], validation: {} },
        { type: "short-text", text: "Name a common data cleaning function in Python", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain feature scaling", required: false, options: [], validation: {} },
        { type: "numeric", text: "How many columns are in the Iris dataset?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is a supervised learning algorithm?", required: true, options: ["Linear Regression", "K-Means"], validation: {} },
        { type: "multi-choice", text: "Select valid evaluation metrics for classification", required: true, options: ["Accuracy", "F1-score", "ROC-AUC"], validation: {} },
        { type: "short-text", text: "Name a Python ML library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe overfitting and underfitting", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default train-test split ratio?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which method handles missing data?", required: true, options: ["impute()", "dropna()"], validation: {} },
        { type: "multi-choice", text: "Select valid regression metrics", required: true, options: ["MSE", "RMSE", "R2"], validation: {} },
        { type: "short-text", text: "Name a dimensionality reduction technique", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain PCA", required: false, options: [], validation: {} },
        { type: "numeric", text: "Number of classes in Iris dataset?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 4",
      questions: [
        { type: "single-choice", text: "Which is a clustering algorithm?", required: true, options: ["K-Means", "Linear Regression"], validation: {} },
        { type: "multi-choice", text: "Select valid Python data types", required: true, options: ["DataFrame", "Series", "ndarray"], validation: {} },
        { type: "short-text", text: "Name a common feature selection method", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain cross-validation", required: false, options: [], validation: {} },
        { type: "numeric", text: "Number of folds in 5-fold CV?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 5",
      questions: [
        { type: "single-choice", text: "Which is used for probabilistic models?", required: true, options: ["Naive Bayes", "SVM"], validation: {} },
        { type: "multi-choice", text: "Select valid ML pipeline steps", required: true, options: ["Data preprocessing", "Feature engineering", "Model training"], validation: {} },
        { type: "short-text", text: "Name a Python library for NLP", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe hyperparameter tuning", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default number of estimators in RandomForest?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Machine Learning Engineer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "11",
  title: `ML Engineer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which framework is used for deep learning?", required: true, options: ["TensorFlow", "React"], validation: {} },
        { type: "multi-choice", text: "Select valid ML algorithms", required: true, options: ["Random Forest", "SVM", "KNN"], validation: {} },
        { type: "short-text", text: "Name a loss function", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain gradient descent", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default learning rate in SGD?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is used for classification?", required: true, options: ["Logistic Regression", "Linear Regression"], validation: {} },
        { type: "multi-choice", text: "Select valid evaluation metrics", required: true, options: ["Precision", "Recall", "F1-score"], validation: {} },
        { type: "short-text", text: "Name a Python ML library", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain bias vs variance", required: false, options: [], validation: {} },
        { type: "numeric", text: "Epochs in default Keras training?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which optimizer is commonly used?", required: true, options: ["Adam", "SGD"], validation: {} },
        { type: "multi-choice", text: "Select valid deep learning layers", required: true, options: ["Dense", "Conv2D", "LSTM"], validation: {} },
        { type: "short-text", text: "Name a hyperparameter tuning method", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe dropout regularization", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default batch size in Keras?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 4",
      questions: [
        { type: "single-choice", text: "Which is used for sequence modeling?", required: true, options: ["RNN", "CNN"], validation: {} },
        { type: "multi-choice", text: "Select valid activation functions", required: true, options: ["ReLU", "Sigmoid", "Tanh"], validation: {} },
        { type: "short-text", text: "Name a model deployment tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain early stopping", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default momentum in SGD?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 5",
      questions: [
        { type: "single-choice", text: "Which is used for unsupervised learning?", required: true, options: ["K-Means", "Decision Tree"], validation: {} },
        { type: "multi-choice", text: "Select valid ML pipeline steps", required: true, options: ["Data cleaning", "Feature selection", "Model evaluation"], validation: {} },
        { type: "short-text", text: "Name a Python library for NLP", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe model versioning", required: false, options: [], validation: {} },
        { type: "numeric", text: "Number of layers in default LeNet?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// DevOps Engineer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "12",
  title: `DevOps Engineer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which tool is used for CI/CD?", required: true, options: ["Jenkins", "React"], validation: {} },
        { type: "multi-choice", text: "Select valid container technologies", required: true, options: ["Docker", "Podman", "LXC"], validation: {} },
        { type: "short-text", text: "Name a cloud provider", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain infrastructure as code", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default Docker network port?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is used for monitoring?", required: true, options: ["Prometheus", "Keras"], validation: {} },
        { type: "multi-choice", text: "Select valid CI tools", required: true, options: ["Jenkins", "GitLab CI", "CircleCI"], validation: {} },
        { type: "short-text", text: "Name a configuration management tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe container orchestration", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default number of replicas in Kubernetes?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which is used for logging?", required: true, options: ["ELK Stack", "React"], validation: {} },
        { type: "multi-choice", text: "Select valid DevOps practices", required: true, options: ["CI/CD", "IaC", "Monitoring"], validation: {} },
        { type: "short-text", text: "Name a cloud provisioning tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain blue-green deployment", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default Jenkins port?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 4",
      questions: [
        { type: "single-choice", text: "Which is used for secrets management?", required: true, options: ["Vault", "Docker"], validation: {} },
        { type: "multi-choice", text: "Select valid cloud services", required: true, options: ["EC2", "S3", "RDS"], validation: {} },
        { type: "short-text", text: "Name a CI/CD pipeline step", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe rolling updates", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default port for Prometheus?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 5",
      questions: [
        { type: "single-choice", text: "Which is used for version control?", required: true, options: ["Git", "SVN"], validation: {} },
        { type: "multi-choice", text: "Select valid container orchestration tools", required: true, options: ["Kubernetes", "Docker Swarm"], validation: {} },
        { type: "short-text", text: "Name a DevOps automation tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain CI/CD best practices", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default max builds in Jenkins queue?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Cloud Engineer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "13",
  title: `Cloud Engineer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which cloud provider offers S3?", required: true, options: ["AWS", "Azure"], validation: {} },
        { type: "multi-choice", text: "Select valid cloud service types", required: true, options: ["IaaS", "PaaS", "SaaS"], validation: {} },
        { type: "short-text", text: "Name a cloud networking service", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain cloud scalability", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default AWS EC2 port?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is used for cloud IaC?", required: true, options: ["Terraform", "Kubernetes"], validation: {} },
        { type: "multi-choice", text: "Select valid cloud storage types", required: true, options: ["Blob", "Bucket", "Disk"], validation: {} },
        { type: "short-text", text: "Name a cloud monitoring tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe cloud disaster recovery", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default max instances in AWS EC2?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which is a managed database?", required: true, options: ["RDS", "MySQL"], validation: {} },
        { type: "multi-choice", text: "Select valid cloud networking options", required: true, options: ["VPC", "Subnet", "Route Table"], validation: {} },
        { type: "short-text", text: "Name a cloud automation tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain cloud load balancing", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default AWS Lambda memory (MB)?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 4",
      questions: [
        { type: "single-choice", text: "Which is used for serverless?", required: true, options: ["AWS Lambda", "EC2"], validation: {} },
        { type: "multi-choice", text: "Select valid cloud security measures", required: true, options: ["IAM", "Security Groups", "NACL"], validation: {} },
        { type: "short-text", text: "Name a cloud cost management tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe multi-region deployment", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default AWS S3 storage class?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 5",
      questions: [
        { type: "single-choice", text: "Which is used for container orchestration in cloud?", required: true, options: ["EKS", "EC2"], validation: {} },
        { type: "multi-choice", text: "Select valid cloud automation tools", required: true, options: ["Terraform", "CloudFormation"], validation: {} },
        { type: "short-text", text: "Name a cloud monitoring service", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain cloud cost optimization strategies", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default timeout for AWS Lambda?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// UI/UX Designer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "14",
  title: `UI/UX Designer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which tool is commonly used for wireframing?", required: true, options: ["Figma", "VS Code"], validation: {} },
        { type: "multi-choice", text: "Select valid UX principles", required: true, options: ["Consistency", "Accessibility", "Feedback"], validation: {} },
        { type: "short-text", text: "Name a popular prototyping tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain user-centered design", required: false, options: [], validation: {} },
        { type: "numeric", text: "Average time for a user test session (minutes)?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is a design system?", required: true, options: ["Material UI", "React Router"], validation: {} },
        { type: "multi-choice", text: "Select valid UI components", required: true, options: ["Buttons", "Cards", "Modals"], validation: {} },
        { type: "short-text", text: "Name a color accessibility tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe the importance of usability testing", required: false, options: [], validation: {} },
        { type: "numeric", text: "Number of standard screen sizes in responsive design?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 3",
      questions: [
        { type: "single-choice", text: "Which is used for user research?", required: true, options: ["Surveys", "Git"], validation: {} },
        { type: "multi-choice", text: "Select valid interaction design patterns", required: true, options: ["Navigation bars", "Modals", "Dropdowns"], validation: {} },
        { type: "short-text", text: "Name a UX testing method", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain heuristic evaluation", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default grid columns in Material Design?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Product Manager
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "15",
  title: `Product Manager Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which framework is used for product prioritization?", required: true, options: ["RICE", "React"], validation: {} },
        { type: "multi-choice", text: "Select valid PM responsibilities", required: true, options: ["Roadmap planning", "Stakeholder management", "KPIs tracking"], validation: {} },
        { type: "short-text", text: "Name a product analytics tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain MVP and its importance", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default sprint duration (weeks)?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is used for market analysis?", required: true, options: ["SWOT", "Git"], validation: {} },
        { type: "multi-choice", text: "Select valid roadmap elements", required: true, options: ["Features", "Milestones", "KPIs"], validation: {} },
        { type: "short-text", text: "Name a prototyping tool used by PMs", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe user persona creation", required: false, options: [], validation: {} },
        { type: "numeric", text: "Typical number of personas in a project?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Project Manager
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "16",
  title: `Project Manager Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which methodology is iterative?", required: true, options: ["Agile", "Waterfall"], validation: {} },
        { type: "multi-choice", text: "Select valid project management tools", required: true, options: ["Jira", "Trello", "MS Project"], validation: {} },
        { type: "short-text", text: "Name a risk management technique", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain project scope management", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default sprint length in Agile (weeks)?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which chart shows task progress?", required: true, options: ["Gantt chart", "Pie chart"], validation: {} },
        { type: "multi-choice", text: "Select valid project deliverables", required: true, options: ["Documentation", "Code", "Test Plan"], validation: {} },
        { type: "short-text", text: "Name a stakeholder communication method", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe risk mitigation strategies", required: false, options: [], validation: {} },
        { type: "numeric", text: "Typical number of team members in a project?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// QA Engineer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "17",
  title: `QA Engineer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which is used for automated testing?", required: true, options: ["Selenium", "React"], validation: {} },
        { type: "multi-choice", text: "Select valid testing types", required: true, options: ["Unit", "Integration", "E2E"], validation: {} },
        { type: "short-text", text: "Name a bug tracking tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain test case design", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default wait time in Selenium (seconds)?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is used for performance testing?", required: true, options: ["JMeter", "VS Code"], validation: {} },
        { type: "multi-choice", text: "Select valid QA metrics", required: true, options: ["Defect Density", "Test Coverage", "MTTR"], validation: {} },
        { type: "short-text", text: "Name a CI/CD integration tool for QA", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe regression testing", required: false, options: [], validation: {} },
        { type: "numeric", text: "Typical number of test cases per module?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Software Tester
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "18",
  title: `Software Tester Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which is a manual testing technique?", required: true, options: ["Exploratory Testing", "Unit Testing"], validation: {} },
        { type: "multi-choice", text: "Select valid testing types", required: true, options: ["Functional", "Non-Functional", "Smoke"], validation: {} },
        { type: "short-text", text: "Name a test management tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain bug lifecycle", required: false, options: [], validation: {} },
        { type: "numeric", text: "Number of phases in V-Model?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which tool is used for automated testing?", required: true, options: ["Selenium", "Notepad"], validation: {} },
        { type: "multi-choice", text: "Select valid test artifacts", required: true, options: ["Test Plan", "Test Case", "Test Script"], validation: {} },
        { type: "short-text", text: "Name a defect tracking tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe regression and smoke testing", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default timeout for test execution (seconds)?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Business Analyst
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "19",
  title: `Business Analyst Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which is used for requirement gathering?", required: true, options: ["Interviews", "VS Code"], validation: {} },
        { type: "multi-choice", text: "Select valid BA techniques", required: true, options: ["Use Cases", "Process Modeling", "SWOT Analysis"], validation: {} },
        { type: "short-text", text: "Name a business analysis tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain gap analysis", required: false, options: [], validation: {} },
        { type: "numeric", text: "Typical number of stakeholders in a project?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which document defines project scope?", required: true, options: ["BRD", "README"], validation: {} },
        { type: "multi-choice", text: "Select valid BA deliverables", required: true, options: ["Requirements Document", "Flowcharts", "User Stories"], validation: {} },
        { type: "short-text", text: "Name a tool for process modeling", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe stakeholder analysis", required: false, options: [], validation: {} },
        { type: "numeric", text: "Number of diagrams in UML use case model?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Technical Writer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "20",
  title: `Technical Writer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which tool is used for documentation?", required: true, options: ["Markdown", "Excel"], validation: {} },
        { type: "multi-choice", text: "Select valid documentation types", required: true, options: ["User Guide", "API Doc", "Release Notes"], validation: {} },
        { type: "short-text", text: "Name a diagramming tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain structured writing", required: false, options: [], validation: {} },
        { type: "numeric", text: "Recommended font size for documentation (pt)?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which format is widely used for technical docs?", required: true, options: ["PDF", "MP4"], validation: {} },
        { type: "multi-choice", text: "Select valid style guides", required: true, options: ["Microsoft Manual", "Chicago Manual", "Google Style Guide"], validation: {} },
        { type: "short-text", text: "Name a version control tool for docs", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe API documentation best practices", required: false, options: [], validation: {} },
        { type: "numeric", text: "Average number of sections in a product guide?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// System Administrator
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "21",
  title: `System Administrator Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which OS is common for servers?", required: true, options: ["Linux", "Windows 10"], validation: {} },
        { type: "multi-choice", text: "Select valid sysadmin tasks", required: true, options: ["User Management", "Backup", "Monitoring"], validation: {} },
        { type: "short-text", text: "Name a system monitoring tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain server hardening", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default SSH port number?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is a configuration management tool?", required: true, options: ["Ansible", "Notepad"], validation: {} },
        { type: "multi-choice", text: "Select valid backup types", required: true, options: ["Full", "Incremental", "Differential"], validation: {} },
        { type: "short-text", text: "Name a virtualization platform", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe disaster recovery plan", required: false, options: [], validation: {} },
        { type: "numeric", text: "Maximum users on a Linux system by default?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Network Engineer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "22",
  title: `Network Engineer Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which is a network device?", required: true, options: ["Router", "VS Code"], validation: {} },
        { type: "multi-choice", text: "Select valid network protocols", required: true, options: ["TCP", "UDP", "HTTP"], validation: {} },
        { type: "short-text", text: "Name a network troubleshooting tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain subnetting", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default subnet mask for Class C network?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which protocol is secure?", required: true, options: ["HTTPS", "FTP"], validation: {} },
        { type: "multi-choice", text: "Select valid network topologies", required: true, options: ["Star", "Mesh", "Bus"], validation: {} },
        { type: "short-text", text: "Name a VLAN management tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe routing vs switching", required: false, options: [], validation: {} },
        { type: "numeric", text: "Default port for SSH?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Cybersecurity Analyst
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "23",
  title: `Cybersecurity Analyst Assessment `,
  sections: [
    {
      title: "Section 1",
      questions: [
        { type: "single-choice", text: "Which is a common security threat?", required: true, options: ["Phishing", "Markdown"], validation: {} },
        { type: "multi-choice", text: "Select valid cybersecurity practices", required: true, options: ["Firewall", "Encryption", "Patch Management"], validation: {} },
        { type: "short-text", text: "Name a vulnerability scanning tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Explain incident response process", required: false, options: [], validation: {} },
        { type: "numeric", text: "Port number for HTTPS?", required: false, options: [], validation: {} },
      ]
    },
    {
      title: "Section 2",
      questions: [
        { type: "single-choice", text: "Which is an authentication protocol?", required: true, options: ["OAuth2", "FTP"], validation: {} },
        { type: "multi-choice", text: "Select valid malware types", required: true, options: ["Virus", "Trojan", "Ransomware"], validation: {} },
        { type: "short-text", text: "Name a SIEM tool", required: false, options: [], validation: {} },
        { type: "long-text", text: "Describe network intrusion detection", required: false, options: [], validation: {} },
        { type: "numeric", text: "Recommended password length (characters)?", required: false, options: [], validation: {} },
      ]
    },
  ]
})),

// Blockchain Developer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "24",
  title: `Blockchain Developer Assessment `,
  sections: Array.from({ length: 5 }, (_, i) => ({
    title: `Section ${i + 1}`,
    questions: [
      { type: "single-choice", text: "Which is a blockchain platform?", required: true, options: ["Ethereum", "Node.js"], validation: {} },
      { type: "multi-choice", text: "Select valid smart contract languages", required: true, options: ["Solidity", "Vyper"], validation: {} },
      { type: "short-text", text: "Name a consensus algorithm", required: false, options: [], validation: {} },
      { type: "long-text", text: "Explain decentralized applications", required: false, options: [], validation: {} },
      { type: "numeric", text: "Current block time of Ethereum?", required: false, options: [], validation: {} },
    ]
  }))
})),

// AI Engineer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "25",
  title: `AI Engineer Assessment `,
  sections: Array.from({ length: 5 }, (_, i) => ({
    title: `Section ${i + 1}`,
    questions: [
      { type: "single-choice", text: "Which is used for neural networks?", required: true, options: ["TensorFlow", "Excel"], validation: {} },
      { type: "multi-choice", text: "Select valid AI tasks", required: true, options: ["Image Recognition", "NLP", "Reinforcement Learning"], validation: {} },
      { type: "short-text", text: "Name a dataset for AI training", required: false, options: [], validation: {} },
      { type: "long-text", text: "Explain overfitting and regularization", required: false, options: [], validation: {} },
      { type: "numeric", text: "Number of layers in a typical CNN?", required: false, options: [], validation: {} },
    ]
  }))
})),

// Game Developer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "26",
  title: `Game Developer Assessment `,
  sections: Array.from({ length: 5 }, (_, i) => ({
    title: `Section ${i + 1}`,
    questions: [
      { type: "single-choice", text: "Which engine is used for games?", required: true, options: ["Unity", "React"], validation: {} },
      { type: "multi-choice", text: "Select valid game genres", required: true, options: ["RPG", "FPS", "Puzzle"], validation: {} },
      { type: "short-text", text: "Name a physics engine", required: false, options: [], validation: {} },
      { type: "long-text", text: "Explain game loop mechanism", required: false, options: [], validation: {} },
      { type: "numeric", text: "FPS for smooth gameplay?", required: false, options: [], validation: {} },
    ]
  }))
})),

// Embedded Systems Engineer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "27",
  title: `Embedded Systems Engineer Assessment `,
  sections: Array.from({ length: 5 }, (_, i) => ({
    title: `Section ${i + 1}`,
    questions: [
      { type: "single-choice", text: "Which is a microcontroller?", required: true, options: ["Arduino", "React"], validation: {} },
      { type: "multi-choice", text: "Select valid embedded programming languages", required: true, options: ["C", "C++", "Python"], validation: {} },
      { type: "short-text", text: "Name a real-time OS", required: false, options: [], validation: {} },
      { type: "long-text", text: "Explain interrupt handling", required: false, options: [], validation: {} },
      { type: "numeric", text: "Typical clock speed in MHz?", required: false, options: [], validation: {} },
    ]
  }))
})),

// AR/VR Developer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "28",
  title: `AR/VR Developer Assessment `,
  sections: Array.from({ length: 5 }, (_, i) => ({
    title: `Section ${i + 1}`,
    questions: [
      { type: "single-choice", text: "Which engine is used for AR/VR?", required: true, options: ["Unity", "Node.js"], validation: {} },
      { type: "multi-choice", text: "Select valid AR/VR devices", required: true, options: ["HoloLens", "Oculus Quest"], validation: {} },
      { type: "short-text", text: "Name a 3D modeling tool", required: false, options: [], validation: {} },
      { type: "long-text", text: "Explain AR vs VR", required: false, options: [], validation: {} },
      { type: "numeric", text: "Typical frame rate for VR?", required: false, options: [], validation: {} },
    ]
  }))
})),

// Mobile App Designer
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "29",
  title: `Mobile App Designer Assessment `,
  sections: Array.from({ length: 5 }, (_, i) => ({
    title: `Section ${i + 1}`,
    questions: [
      { type: "single-choice", text: "Which tool is for UI design?", required: true, options: ["Figma", "VS Code"], validation: {} },
      { type: "multi-choice", text: "Select valid design principles", required: true, options: ["Consistency", "Hierarchy", "Contrast"], validation: {} },
      { type: "short-text", text: "Name a prototyping tool", required: false, options: [], validation: {} },
      { type: "long-text", text: "Explain responsive design for mobile", required: false, options: [], validation: {} },
      { type: "numeric", text: "Typical screen DPI for mobile?", required: false, options: [], validation: {} },
    ]
  }))
})),

// SEO Specialist
...[1, 2, 3].map((assessmentNum) => ({
    assessmentId: uuidv4(),
  jobId: "30",
  title: `SEO Specialist Assessment `,
  sections: Array.from({ length: 5 }, (_, i) => ({
    title: `Section ${i + 1}`,
    questions: [
      { type: "single-choice", text: "Which is a search engine?", required: true, options: ["Google", "Figma"], validation: {} },
      { type: "multi-choice", text: "Select valid SEO techniques", required: true, options: ["On-page SEO", "Off-page SEO", "Technical SEO"], validation: {} },
      { type: "short-text", text: "Name a keyword research tool", required: false, options: [], validation: {} },
      { type: "long-text", text: "Explain backlink strategy", required: false, options: [], validation: {} },
      { type: "numeric", text: "Recommended title length (characters)?", required: false, options: [], validation: {} },
    ]
  }))
})),





  
];
