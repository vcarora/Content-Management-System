package com.vc.userAuthentication.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT,reason = "User already exists with same credentials")
public class UserAlreadyExistException extends Throwable{
}
