export const Pages = ["add_User", "add_user_role",  "work_location", "schedule","attendance",  "tasks","reports", "invoice", "email_templates"]

export const pagesWithRoute = {
    "add_User": "users",
    "add_user_role": "userroles",
    "work_location": "worklocation",
    "schedule": "schedule",
    "attendance": "attendance",
    "tasks": "task",
    "reports": "reports",
    "invoice": "invoice",
    "email_templates": "emailtemplates"
  }  

export const userRole = {
    "admin":1,
    "client":2,
    "serviceman":3,
    "auditor": 4
}

export const activeStatus = {
    "active":1,
    "deactive": 2,
    "delete": 0
}


export const StatusDropDown = [
    { name: 'Active', value: 1 },
    { name: 'Inactive', value: 2 }
];