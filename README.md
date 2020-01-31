# maturify-com.github.io
This repository is for managing the Maturify marketing website.

## Pre-Requisites
Install gulp : `npm install --global gulp-cli`

### Testing Purposes
Run the general gulp command `gulp` and by navigating to [localhost:3000](http://localhost:3000/) in the browser (it should automatically open in the browser once the command is run).

The website will automatically reload whenever changes are made in the html files within the `src` folder.

## Developer Instructions
_Feature branch_
1. Create a branch off the master branch with a branch name that includes the following,
    - The type of action you would be doing in the branch
        * ENH -- Enhancement
        * FTR -- New Feature
    - A brief description of the task
    - The task ID
  eg:- `ENH-Your_Description-#1`
2. Once your branch is created, you can check it out and start developing.
3. On completing your task, run a `gulp build` to create the `dist` (distribution) folder for the production website.
4. Now you can push your files to your remote branch and add a pull request to the master branch
5. Once the pull request is reviewed adequately and merge to the master branch the website would get updated.