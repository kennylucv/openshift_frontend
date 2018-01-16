import { Component, OnInit }    from '@angular/core';
import { User }                 from '../_models/index';
import { UserService }          from '../_services/index';
import { NewsService }          from '../_services/index';
import { HeaderComponent } from '../header/header.component';
@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.scss']
})

export class HomeComponent implements OnInit {
    currentUser:    string;
    users:          User[] = [];
    accountData:    any[];
    numberAccounts= 0;
    newsData:       any[];
    showBulletin=   false;

    constructor(private userService: UserService, private newsService: NewsService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.userLoad();
        //this.getNewsBulletin();
        //this.loadUserInfo
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private userLoad(){
        this.userService.getAccountForUser(this.currentUser).subscribe(data => { 
            this.accountData = data.accounts;
            this.numberAccounts = this.accountData.length;
            if (data.bulletin){
                this.getNewsBulletin();
            }
        });
    }

    private getNewsBulletin(){
        //TODO: display bulletin
        this.showBulletin = true;
        this.newsService.getNews().subscribe(newsResponse => {
            this.newsData = newsResponse.articles;
        });
    }
}