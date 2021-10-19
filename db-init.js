db.createUser({
    user: "user",
    pwd: "secretPassword",
    roles: [ { role: "dbOwner", db: "PortfolioDoctor" } ]
  })
  
  db.users.insert({
    name: "user"
  })