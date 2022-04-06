# ✏️ Learning Recoil ✏️

Taking a Recoil Course at ✨ [learn recoil](https://learnrecoil.com/) ✨

-   Cloned Repo 👉 https://github.com/jacques-blom/recoil-course
-   Official Docs 👉 https://recoiljs.org/docs/basic-tutorial/intro

## What I'll Learn

🔄 Rotating shapes  
✌️ Multi-select  
🔵 More kinds of shapes  
💾 Saving a drawing to a file and opening it again  
🌍 Saving the drawing to a server (shareable drawing URL)  
🌄 Loading content (e.g. images) from an API with Recoil and Suspense  
👯‍♂️ Enabling concurrent mode  
🧪 Adding full test coverage  
🤔 Your own dev tools for debugging  
🔑 Authentication  
🏃 Performance debugging, testing, and improvement  
And more...

## Table of Contents with simple notes

-   Intro

    -   Course Intro
    -   Overview of Recoil
        -   **Why build Recoil?**  
            the nature of the app has large number of rendered components that needs to be frequently update in isolation
        -   **Recoil's Key Features**
            -   _Flexible shared state_
                -   boilerplate-free as simple as get/set
                -   allows code-splitting
            -   _Derived data_
                -   data can be derived safely and simply from state and other derived data
                -   access derived data same way one would access state
                -   derived data can be synchronous or asynchronous
            -   _App-wide state observation_
                -   read any part of Recoil state
                -   observe changes to state
                -   persist application state
                -   rehydration (backwards compatible)
        -   **Why use Recoil?**  
             works particularly well when component tree and state structure don't match
    -   Project Setup

-   The Basics
    -   Atoms - Basics
    -   Selectors - Basics
-   Atom & Selector Families
    -   Atom Families
    -   Atom Families 2
    -   Selector Families
-   Async Selectors
    -   Data Fetching - Basics
    -   Data Fetching - Advances
    -   Data Fetching in out Design Tool
-   Patterns
    -   Error Handling
    -   Intermediate Selectors
    -   Selector Composition
-   Atom Effects
    -   Atom Effects - Basics
    -   Atom Effects with Atom Families
    -   Async Atom Effects
    -   Optimizing API Calls
    -   Unnecessary onSet calls
    -   Atom Effects vs Async Selectors

## Issues

-   yarn start failed on Node v17.3.0 → had to downgrade to Node v16.14.2
-   potential security vulnerabilities in dependencies
