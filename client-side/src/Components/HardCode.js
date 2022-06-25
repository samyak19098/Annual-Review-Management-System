import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ViewListIcon from '@mui/icons-material/ViewList';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateIcon from '@material-ui/icons/Create';
import React from "react";
import Button from "@material-ui/core/Button";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

var profileFields = {
    // <TextField id="firstName" label="First Name" type="text" value={profile.firstName}  InputProps={{readOnly: true}}/>
    firstName: {
        id: "firstName",
        label: "First Name",
        type: "text",
        value: null,
        readOnly: true,
        newLine: false
    },
    middleName: {
        id: "middleName",
        label: "Middle Name",
        type: "text",
        value: null,
        readOnly: true,
        newLine: false
    },
    lastName: {
        id: "lastName",
        label: "Last Name",
        type: "text",
        value: null,
        readOnly: true,
        newLine: true
    },
    gender: {
        id: "gender",
        label: "Gender",
        type: "text",
        value: null,
        readOnly: true,
        newLine: false
    },
    doj: {
        id: "doj",
        label: "Date of Joining",
        type: "date",
        value: null,
        readOnly: true,
        newLine: true
    },
    emailAddress: {
        id: "email",
        label: "Email Address",
        type: "text",
        value: null,
        readOnly: true,
        newLine: false
    },
    phoneNumber: {
        id: "phoneNumber",
        label: "Phone Number",
        type: "text",
        value: null,
        readOnly: true,
        newLine: true
    },
    designation: {
        id: "designation",
        label: "Designation",
        type: "text",
        value: null,
        readOnly: true,
        newLine: true
    },
    primaryDepartment: {
        id: "primaryDepartment",
        label: "Primary Department",
        type: "text",
        value: null,
        readOnly: true,
        newLine: false
    },
    secondaryDepartment: {
        id: "secondaryDepartment",
        label: "Secondary Department",
        type: "text",
        value: null,
        readOnly: true,
        newLine: false
    },
    organization: {
        id: "organization",
        label: "Organization",
        type: "text",
        value: null,
        readOnly: true,
        newLine: false
    },
    researchAreas: {
        id: "researchAreas",
        label: "Research Areas",
        type: "text",
        value: null,
        readOnly: true,
        newLine: false
    }
};
var navbarFields = {
    prof: [
        {
            key: "Home",
            pushPath: "/home/",
            component: <HomeIcon/>,
            primary: "Home"
        },
        {
            key: "Profile",
            pushPath: "/profile/view/",
            component: <AccountCircleIcon/>,
            primary: "Profile"
        },
        {
            key: "Report",
            pushPath: "/report/uploadfile/",
            component: <AssignmentIcon/>,
            primary: "Report"
        },
        {
            key: "Performance Summary",
            pushPath: "/performance/",
            component: <AssessmentIcon/>,
            primary: "Performance Summary"
        }
    ],
    reviewer: [
        {
            key: "Home",
            pushPath: "/home/",
            component: <HomeIcon/>,
            primary: "Home"
        },
        {
            key: "Profile",
            pushPath: "/profile/view/",
            component: <AccountCircleIcon/>,
            primary: "Profile"
        },
        {
            key: "Assigned Reports",
            pushPath: "/assignedReports/",
            component: <AssessmentIcon/>,
            primary: "Assigned Reports"
        }
    ],
    dofa: [
        {
            key: "Home",
            pushPath: "/home/",
            component: <HomeIcon/>,
            primary: "Home"
        },
        // {
        //     key: "Profile",
        //     pushPath: "/profile/view/",
        //     component: <AccountCircleIcon/>,
        //     primary: "Profile"
        // },
        {
            key: "Faculty Reviews",
            pushPath: "/reviewedReports/",
            component: <AccountCircleIcon/>,
            primary: "Faculty Reviews"
        },
        {
            key: "Analysis",
            pushPath: "/analysis/",
            component: <AccountCircleIcon/>,
            primary: "Analysis"
        }
    ],
    admin: [
        {
            key: "Home",
            pushPath: "/home/",
            component: <HomeIcon/>,
            primary: "Home"
        },

        {
            key: "Create Reviewer Account",
            pushPath: "/createAccount/",
            component: <PersonAddIcon/>,
            primary: "Create Reviewer Account"
        },
        {
            key: "View Reviewers",
            pushPath: "/viewReviewerAccounts/",
            component: <ViewListIcon/>,
            primary: "View and Update Reviewer Accounts",

        },
        {
            key: "View and Update Faculty Accounts",
            pushPath: "/viewFacultyAccounts/",
            component: <ViewListIcon/>,
            primary: "View and Update Faculty Accounts",

        },
        // {
        //     key: "Update Faculty Account",
        //     pushPath: "/home/",
        //     component: <AccountCircleIcon/>,
        //     primary: "Update Faculty Account"
        // },
        {
            key: "Assign Reports",
            pushPath: "/assignReport/",
            component: <AccountCircleIcon/>,
            primary: "Assign Reports"
        },
        {
            key: "Faculty Reports",
            pushPath: "/reviewedReports/",
            component: <AccountCircleIcon/>,
            primary: "Faculty Reports"
        },
        {
            key: "Deadlines",
            pushPath: "/deadlines/",
            component: <AccessTimeIcon/>,
            primary: "Deadlines"
        }
    ],
    hod: [
        {
            key: "Home",
            pushPath: "/home/",
            component: <HomeIcon/>,
            primary: "Home"
        },
        // {
        //     key: "Profile",
        //     pushPath: "/profile/view/",
        //     component: <AccountCircleIcon/>,
        //     primary: "Profile"
        // },
        // {
        //     key: "Report",
        //     pushPath: "/report/uploadfile/",
        //     component: <AssignmentIcon/>,
        //     primary: "Report"
        // },
        // {
        //     key: "Performance Summary",
        //     pushPath: "/home/",
        //     component: <AssessmentIcon/>,
        //     primary: "Performance Summary"
        // },
        {
            key: "Review Report",
            pushPath: "/assignedReports",
            component: <CreateIcon/>,
            primary: "Review Report"
        }
    ],
    doaa: [
        {
            key: "Home",
            pushPath: "/home/",
            component: <HomeIcon/>,
            primary: "Home"
        },
        // {
        //     key: "Profile",
        //     pushPath: "/profile/view/",
        //     component: <AccountCircleIcon/>,
        //     primary: "Profile"
        // },
        // {
        //     key: "Report",
        //     pushPath: "/report/uploadfile/",
        //     component: <AssignmentIcon/>,
        //     primary: "Report"
        // },
        // {
        //     key: "Performance Summary",
        //     pushPath: "/home/",
        //     component: <AssessmentIcon/>,
        //     primary: "Performance Summary"
        // },
        {
            key: "Review Report",
            pushPath: "/assignedReports/",
            component: <CreateIcon/>,
            primary: "Review Report"
        }
    ],
};
var userUpdatableFields = [
    'researchAreas',
    'primaryDepartment',
    'secondaryDepartment',
    'phoneNumber',
    'designation',
    // 'organization'
];
const reviewedReportsColumns = [
    {
        field: 'id', headerName: 'S no.', width: 150, filterable: false, hide: true,
    },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 200,
        editable: false
    },
    {
        field: 'middleName',
        headerName: 'Middle Name',
        width: 200,
        editable: false
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 200,
        editable: false
    },
    {
        field: 'year',
        headerName: 'Year',
        width: 200,
        editable: false
    },
    {
        field: 'status',
        headerName: 'Review Status',
        width: 200,
        editable: false

    },

];
const reviewerFormFields = [
    {
        label: "Publication",
        name: "publication",
        remarkField: "",
        value: null,
    },
    {
        label: "Patents",
        name: "patents",
        remarkField: "",
        value: null,
    },
    {
        label: "Funding",
        name: "funding",
        remarkField: "",
        value: null,
    },
    {
        label: "Entrepreneurship and Societal Impact",
        name: "entrepreneurship",
        remarkField: "",
        value: null,
    }
];
const collectiveReviewFields = [
    {
        label: "Publication",
        name: "publication",
        remarkField: "",
        value: null,
    },
    {
        label: "Patents",
        name: "patents",
        remarkField: "",
        value: null,
    },
    {
        label: "Funding",
        name: "funding",
        remarkField: "",
        value: null,
    },
    {
        label: "Entrepreneurship and Societal Impact",
        name: "entrepreneurship",
        remarkField: "",
        value: null,
    },
    {
        label: "Teaching",
        name: "teaching",
        remarkField: "",
        value: null,
    },
    {
        label: "Services",
        name: "services",
        remarkField: "",
        value: null,
    },
    // {
    //     label: "Overall Feedback (External)",
    //     name: "external",
    //     remarkField: "",
    //     value: null,
    // },
    {
        label: "Overall Feedback",
        name: "finalReviewer",
        remarkField: "",
        value: null,
    }
]
const gradingFormFields = [
    {
        label: "Research",
        name: "research",
        remarkField: "",
        value: null,
    },
    {
        label: "Teaching",
        name: "teaching",
        remarkField: "",
        value: null,
    },
    {
        label: "Services (Institute + Professional)",
        name: "services",
        remarkField: "",
        value: null,
    },
];
const hodFormFields = [
    {
        label: "Teaching",
        name: "teaching",
        remarkField: "",
        value: null,
    },
    {
        label: "Services (Institue + Professional)",
        name: "services",
        remarkField: "",
        value: null,
    },
    // {
    //     label: "Professional Service",
    //     name: "professionalService",
    //     value: null,
    // },

];
const dofaFormFields = [

    {
        label: "Teaching",
        name: "teaching",
        remarkField: "",
        value: null,
    },
    {
        label: "Services (Institute + Professional)",
        name: "services",
        remarkField: "",
        value: null,
    },
];
const reviewerReportsColumns = [
    {
        field: 'id',
        headerName: 'Report ID',
        width: 180,
        hide: true
    },
    {
        field: 'reportName',
        headerName: 'Report Name',
        width: 210,

    },
    {
        field: 'yearOfReport',
        headerName: 'Year Of Report',
        width: 220,
        editable: false,
    },
    {
        field: 'facultyName',
        headerName: 'Faculty name',
        width: 200,
        editable: false,
    },
    {
        field: 'emailAddress',
        headerName: 'Faculty Email Address',
        width: 220,
        editable: false,
    },
    {
        field: 'reviewStatus',
        headerName: 'Review Status',
        width: 210,
        // editable: false,
    },
];
const reviewerDetailsColumns = [
    {
        field: 'id', headerName: 'Id', width: 150, filterable: false
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        width: 200,
        editable: false
    },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'middleName',
        headerName: 'Middle Name',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'emailAddress',
        headerName: 'Email Address',
        width: 350,
        editable: false
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 250,
        editable: false
    },
    {
        field: 'primaryDepartment',
        headerName: 'Primary Department',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'researchAreas',
        headerName: 'Research Areas',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'designation',
        headerName: 'Designation',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'domain',
        headerName: 'Domain',
        width: 200,
        editable: false,
    },


];
const facultyDetailsColumns = [
    {
        field: 'id', headerName: 'Faculty Id', width: 200, filterable: false
    },
    {
        field: 'fullName',
        headerName: 'Full Name',
        width: 200,
        editable: false
    },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'middleName',
        headerName: 'Middle Name',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'emailAddress',
        headerName: 'Email Address',
        width: 300,
        editable: false
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'doj',
        headerName: 'Date Of Joining',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'primaryDepartment',
        headerName: 'Primary Department',
        width: 300,
        editable: false
    },
    {
        field: 'secondaryDepartment',
        headerName: 'Secondary Department',
        width: 300,
        editable: false,
        hide: true
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'designation',
        headerName: 'Designation',
        width: 200,
        editable: false,
        hide: true
    },
    {
        field: 'researchAreas',
        headerName: 'Research Areas',
        width: 800,
        editable: false,
        hide: true
    },
    {
        field: 'empId',
        headerName: 'EmpId',
        width: 150,
        editable: false,
        hide: true
    },
    {
        field: 'phd',
        headerName: 'PHD',
        width: 500,
        editable: false,
        hide: true
    },


];
const reviewerFields = {
    publication: {
        label: "Publication",
        name: "publication",
        remarkField: "",
        value: null,
    },
    patents: {
        label: "Patents",
        name: "patents",
        remarkField: "",
        value: null,
    },
    funding: {
        label: "Funding",
        name: "funding",
        remarkField: "",
        value: null,
    },
    entrepreneurship: {
        label: "Entrepreneurship and Societal Impact",
        name: "entrepreneurship",
        remarkField: "",
        value: null,
    },
    publicationRemark: {
        label: "Publication Remark",
        name: "publicationRemark",
        remarkField: "",
        value: null,
    },
    patentsRemark: {
        label: "Patents Remark",
        name: "patentsRemark",
        remarkField: "",
        value: null,
    },
    fundingRemark: {
        label: "Funding Remark",
        name: "fundingRemark",
        remarkField: "",
        value: null,
    },
    entrepreneurshipRemark: {
        label: "Entrepreneurship and Societal Impact Remark",
        name: "entrepreneurshipRemark",
        remarkField: "",
        value: null,
    },
    finalReviewerRemark: {
        label: "Final Remark",
        name: "finalReviewerRemark",
        remarkField: "",
        value: null,
    },
    teaching: {
        label: "Teaching",
        name: "teaching",
        remarkField: "",
        value: null,
    },
    services: {
        label: "Services",
        name: "services",
        remarkField: "",
        value: null,
    },
    finalGrade: {
        label: "Final Grade",
        name: "finalGrade",
        remarkField: "",
        value: null,
    },
    servicesRemark: {
        label: "Services Remark",
        name: "servicesRemark",
        remarkField: "",
        value: null,
    },
    teachingRemark: {
        label: "Teaching Remark",
        name: "teachingRemark",
        remarkField: "",
        value: null,
    },
    finalInternalRemark: {
        label: "Final Internal Remark",
        name: "finalInternalRemark",
        remarkField: "",
        value: null,
    },
};
const profileFieldGrouping = {
    prof: [
        [
            {
                firstName: {
                    id: "firstName",
                    label: "First Name",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
                middleName: {
                    id: "middleName",
                    label: "Middle Name",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
                lastName: {
                    id: "lastName",
                    label: "Last Name",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: true
                },
            },
        ],
        [
            {
                designation: {
                    id: "designation",
                    label: "Designation",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: true
                },
                primaryDepartment: {
                    id: "primaryDepartment",
                    label: "Primary Department",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
                secondaryDepartment: {
                    id: "secondaryDepartment",
                    label: "Secondary Department",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
            },
        ],
        [
            {
                emailAddress: {
                    id: "email",
                    label: "Email Address",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
                phoneNumber: {
                    id: "phoneNumber",
                    label: "Phone Number",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: true
                },
            },
        ],
        [
            {
                gender: {
                    id: "gender",
                    label: "Gender",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
                doj: {
                    id: "doj",
                    label: "Date of Joining",
                    type: "date",
                    value: null,
                    readOnly: true,
                    newLine: true
                },
            },
        ],
        [
            {
                researchAreas: {
                    id: "researchAreas",
                    label: "Research Areas",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
            }
        ]
    ],
    reviewer: [
        [
            {
                firstName: {
                    id: "firstName",
                    label: "First Name",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
                middleName: {
                    id: "middleName",
                    label: "Middle Name",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
                lastName: {
                    id: "lastName",
                    label: "Last Name",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: true
                },
            },
        ],
        [
            {
                designation: {
                    id: "designation",
                    label: "Designation",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: true
                },
                primaryDepartment: {
                    id: "primaryDepartment",
                    label: "Primary Department",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
                secondaryDepartment: {
                    id: "secondaryDepartment",
                    label: "Secondary Department",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
            },
        ],
        [
            {
                emailAddress: {
                    id: "email",
                    label: "Email Address",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
                phoneNumber: {
                    id: "phoneNumber",
                    label: "Phone Number",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: true
                },
            },
        ],
        [
            {
                gender: {
                    id: "gender",
                    label: "Gender",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
                organization: {
                    id: "organization",
                    label: "Organization",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: true
                },
            },
        ],
        [
            {
                researchAreas: {
                    id: "researchAreas",
                    label: "Research Areas",
                    type: "text",
                    value: null,
                    readOnly: true,
                    newLine: false
                },
            }
        ]
    ],
}
const facultyTableList = ['prof', 'doaa', 'hod', 'dofa'];
const reviewFields = ['Publication', 'Patents', "Funding", "Entrepreneurship"]
const roleToDisplay = {
    admin: 'Admin',
    prof: 'Professor',
    hod: 'HOD',
    reviewer: 'Reviewer',
    dofa: 'DoFA',
    doaa: 'DoAA'
}
const numericGradingFields = {
    research: {
        label: 'Research',
    },
    services: {
        label: 'Services (Institute + Professional)',
    },
    teaching: {
        label: 'Teaching',
    },
}
const departments = [
    'CSE',
    'ECE',
    'MTH',
    'SSH',
    'HCD',
]
const graphFieldColors = {
    research: 'rgb(151,17,88)',
    services: 'rgb(123,179,49)',
    teaching: 'rgb(49,119,179)',
}
const graphCountColors = {
    1: 'rgb(22,25,233)',
    2: 'rgb(158,17,205)',
    3: 'rgb(87,2,47)',
    4: 'rgb(160,51,78)',
    5: 'rgb(240,4,39)',
}
const quotes = {
    'Anonymous': "It's not what you look at that matters, it's what you see.",
    'John Wooden': 'Things work out best for those who make the best of how things work out.',
    'Jim Rohn': "Successful people do what unsuccessful people are not willing to doDon't wish it were easier, wish you were better.",
    'Swami Vivekananda': 'Take up one idea. Make that one idea your life -- think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.',
    'Walt Disney': 'All our dreams can come true if we have the courage to pursue them.',
    'Winston Churchill': "If you're going through hell keep going.",
    'Proverb': 'Just when the caterpillar thought the world was ending, he turned into a butterfly.',
    'Vaibhav Shah': 'Whenever you see a successful person you only see the public glories, never the private sacrifices to reach them.',
    'Chris Grosser': "Opportunities don't happen, you create them.",
    'Albert Einstein': "If you can't explain it simply, you don't understand it well enough.",
    'Eleanor Roosevelt': 'No one can make you feel inferior without your consent.',
    'Thomas A. Edison': "I have not failed. I've just found 10,000 ways that won't work.",
    'Kim Garst': "If you don't value your time, neither will others. Stop giving away your time and talents- start charging for it.",
    'David Brinkley': 'A successful man is one who can lay a firm foundation with the bricks others have thrown at him.',
    'Henry Ford': "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.",
    'Oscar Wilde': 'What seems to us as bitter trials are often blessings in disguise.',
    'Bruce Feirstein': 'The distance between insanity and genius is measured only by success.',
    'Lolly Daskal': 'Life is not about finding yourself. Life is about creating yourself.',
    'John D. Rockefeller': "Don't be afraid to give up the good to go for the great.",
    'Nathaniel Hawthorne': 'Happiness is a butterfly, which when pursued, is always beyond your grasp, but which, if you will sit down quietly, may alight upon you.',
    'Steve Jobs': "You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something - your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.",
    'Ray Goforth': 'There are two types of people who will tell you that you cannot make a difference in this world: those who are afraid to try and those who are afraid you will succeed.',
    'Dr. APJ Kalam': 'Thinking should become your capital asset, no matter whatever ups and downs you come across in your life.',
    'Thomas Jefferson': 'I find that the harder I work, the more luck I seem to have.',
    'Napolean Hill': 'The starting point of all achievement is desire.',
    'Robert Collier': 'Success is the sum of small efforts, repeated day-in and day-out.',
    'Thomas J. Watson': 'If you want to achieve excellence, you can get there today. As of this second, quit doing less-than-excellent work.',
    'Michael John Bobak': 'All progress takes place outside the comfort zone.',
    'Philippos': 'You may only succeed if you desire succeeding; you may only fail if you do not mind failing.',
    'Mark Twain': 'Whenever you find yourself on the side of the majority, it is time to pause and reflect.',
    'Pablo Picasso': 'Only put off until tomorrow what you are willing to die having left undone.',
    'Zig Ziglar': "People often say that motivation doesn't last. Well, neither does bathing - that's why we recommend it daily.",
    'Earl Nightingale': "We become what we think about most of the time, and that's the strangest secret.",
    'Vidal Sassoon': 'The only place where success comes before work is in the dictionary.',
    'Guy Kawasaki': 'The best reason to start an organization is to make meaning; to create a product or service to make the world a better place.',
    'Martha Stewart': 'I find that when you have a real interest in life and a curious life, that sleep is not the most important thing.',
    'Colin R. Davis': 'The road to success and the road to failure are almost exactly the same.',
    'Ralph Nader': 'The function of leadership is to produce more leaders, not more followers.',
    'Maya Angelou': 'Success is liking yourself, liking what you do, and liking how you do it.',
    'Bill Gates': 'As we look ahead into the next century, leaders will be those who empower others.',
    'Henry Kravis': 'A real entrepreneur is somebody who has no safety net underneath them.',
    'Mark Caine': 'The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.',
    'Tony Robbins': 'People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed. Similarly, when someone is failing, the tendency is to get on a downward spiral that can even become a self-fulfilling prophecy.',
    'Audre Lorde': 'When I dare to be powerful - to use my strength in the service of my vision, then it becomes less and less important whether I am afraid.',
    'Bruce Lee': 'The successful warrior is the average man, with laser-like focus.',
    'Dale Carnegie': 'Most of the important things in the world have been accomplished by people who have kept on trying when there seemed to be no help at all.',
    'Gurbaksh Chahal': "If you genuinely want something, don't wait for it -- teach yourself to be impatient.",
    'Robert Kiyosaki': "Don't let the fear of losing be greater than the excitement of winning.",
    'T. Harv Eker': 'If you want to make a permanent change, stop focusing on the size of your problems and start focusing on the size of you!',
    'Napoleon Hill': 'The number one reason people fail in life is because they listen to their friends, family, and neighbors.',
    'Denis Watiley': "The reason most people never reach their goals is that they don't define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.",
    'Jane Smiley': 'In my experience, there is only one motivation, and that is desire. No reasons or principle contain it or stand against it.',
    'George Bernard Shaw': 'Success does not consist in never making mistakes but in never making the same one a second time.',
    'Diane Ackerman': "I don't want to get to the end of my life and find that I lived just the length of it. I want to have lived the width of it as well.",
    'Michael Jordan': 'You must expect great things of yourself before you can do them.',
    'Jim Ryun': 'Motivation is what gets you started. Habit is what keeps you going.',
    'Ella Wheeler Wilcox': 'There is no chance, no destiny, no fate, that can hinder or control the firm resolve of a determined soul.',
    'Francis Chan': "Our greatest fear should not be of failure but of succeeding at things in life that don't really matter.",
    'George Lorimer': "You've got to get up every morning with determination if you're going to go to bed with satisfaction.",
    'Mike Gafka': "To be successful you must accept all challenges that come your way. You can't just accept the ones you like.",
    'John C. Maxwell': 'Success is...knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.',
    'Wayne Dyer': "Be miserable. Or motivate yourself. Whatever has to be done, it's always your choice.",
    'Anatole France': 'To accomplish great things, we must not only act, but also dream, not only plan, but also believe.',
    'Booker T. Washington': 'You measure the size of the accomplishment by the obstacles you had to overcome to reach your goals.',
    'Theodore N. Vail': 'Real difficulties can be overcome; it is only the imaginary ones that are unconquerable.',
    'Herman Melville': 'It is better to fail in originality than to succeed in imitation.',
    'Virgil': 'Fortune sides with him who dares.',
    'Washington Irving': 'Little minds are tamed and subdued by misfortune; but great minds rise above it.',
    'Truman Capote': 'Failure is the condiment that gives success its flavor.',
    'John R. Wooden': "Don't let what you cannot do interfere with what you can do.",
    'Margaret Thatcher': 'You may have to fight a battle more than once to win it.'
}
const emailTemplates = [
    {id:1, subject: "Welcome Message 1", message:"Welcome to ARMS. Please login using your credentials."},
    {id:2, subject: "Welcome Message 2", message:"Your account has been created successfully. Please update your details on portal."}
]
const otherEmailTemplates = [
    {id:1, subject: "Template 1", message:"Reports for current year has been assigned. Kindly provide your review for the same."},
    {id:2, subject: "Template 2", message:"Gentle reminder to fill the reviews."}
]
function jsonEscape(str)  {
    let returnValue = str;
    try {
        returnValue = str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
    } catch (e) {
        console.log('Type of str is not string');
    }

    return returnValue;
}
function jsonUnescape(str)  {
    let returnValue = str;
    try {
        returnValue = str.replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t");
    } catch (e) {
        console.log('Type of str is not string');
    }

    return returnValue;
}

export {
    profileFields,
    navbarFields,
    userUpdatableFields,
    reviewedReportsColumns,
    reviewerFormFields,
    facultyTableList,
    reviewFields,
    reviewerReportsColumns,
    hodFormFields,
    dofaFormFields,
    reviewerDetailsColumns,
    facultyDetailsColumns,
    roleToDisplay,
    gradingFormFields,
    numericGradingFields,
    departments,
    graphFieldColors,
    quotes,
    emailTemplates,
    otherEmailTemplates,
    collectiveReviewFields,
    reviewerFields,
    profileFieldGrouping,
    jsonEscape,
    jsonUnescape,
}