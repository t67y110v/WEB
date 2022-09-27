package main

import (
	"html/template"
	"net/http"
)

type User struct {
	Name string
	Age  int
}

func homePage(w http.ResponseWriter, r *http.Request) {
	//bob := User{"bob", 21}
	tmpl, _ := template.ParseFiles("templates/mainPage.html", "templates/shared/header.html", "templates/shared/footer.html")
	tmpl.ExecuteTemplate(w, "index", nil)

}

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))
	http.HandleFunc("/", homePage)
	http.ListenAndServe(":8080", nil)
}
