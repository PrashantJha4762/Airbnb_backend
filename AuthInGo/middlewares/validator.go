package middlewares

import (
	"AuthInGo/utils"
	"net/http"
)

func RequestValidator(next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter,r *http.Request){
		var payload any
		err:=utils.ReadJsonBody(r,&payload)
		if err!=nil{
			utils.WriteJsonErrorResponse(w,http.StatusBadRequest,"Invalid request body",err)
			return 
		}
		verr:=utils.Validator.Struct(payload)
		if verr!=nil{
			utils.WriteJsonErrorResponse(w,http.StatusBadRequest,"Validation failed",err)
			return 
		}
		next.ServeHTTP(w,r)
	})
}