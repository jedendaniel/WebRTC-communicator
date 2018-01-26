package login.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.sql.DataSource;

//@PropertySource(value = { "login.auth" })
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled=true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private MyAppUserDetailsService myAppUserDetailsService;
    @Autowired
    private AppAuthenticationEntryPoint appAuthenticationEntryPoint;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                    .antMatchers("/", "/index.html", "/signup.html", "/js/signup.js", "/api/noauth/**").permitAll() //
//                    .anyRequest().authenticated()
                    .antMatchers("/api/auth/**").hasAnyRole("ADMIN","USER")
//                .and()
//                    .authorizeRequests()
//                    .antMatchers("/index.html", "/signup.html").permitAll()
//                .and()
//                    .authorizeRequests()
//                    .anyRequest().authenticated()
                .and()
                .httpBasic().realmName("webrtcapi")
                    .authenticationEntryPoint(appAuthenticationEntryPoint);
//                .and()
//                .formLogin()
//                    .loginPage("/login.html")
//                    .defaultSuccessUrl("/main.html")
//                    .failureUrl("/login.html")
//                    .permitAll()
//                .and()
//                .logout()
//                    .permitAll();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        auth.userDetailsService(myAppUserDetailsService).passwordEncoder(passwordEncoder);
    }
}
