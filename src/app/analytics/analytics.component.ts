import { Component, OnInit } from '@angular/core';
import { ElectionService } from '../election.service';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  states : any[] = [];
  constituency : any[] = [];
  state_selected = "";
  constituency_selected = ""
  candidate_details:any[] = [];
  graph_data = [];
  spinner = false;
  error_msg = false;
  pieChart:GoogleChartInterface;
  winner_candidate_name = "";
  constructor(private election : ElectionService) { }

  ngOnInit() 
  {
    this.election.state_names().subscribe(res => {
      this.states = res['states'];
    })
  }

  getState(event)
  {
    let state = event.target.value;
    this.state_selected = state;
    this.election.constituency_names(state).subscribe(res => {
      this.constituency = res["Constituency"];
    })
  }

  getConstituency(event)
  {
    this.error_msg = false;
    this.spinner = true;
    this.candidate_details = [];
    this.graph_data = [];
    let constituency = event.target.value;
    this.constituency_selected = constituency;
    this.election.constituency_details(this.state_selected,constituency).subscribe(res => {
      this.candidate_details = res["details"];
      this.graph_data.push(["Candidate Name" , "Total"])
      for(let r of this.candidate_details)
      {
        this.graph_data.push([r['Candidate'] , r['Total']])
      }
      if (this.candidate_details.length > 0)
      {
        this.spinner = false;
        this.drawGraph(this.graph_data);
      }
      else
      {
        this.error_msg = true;
        this.spinner = false;
      }
    })
    this.election.winner_details(this.state_selected,this.constituency_selected).subscribe(res => {
     this.winner_candidate_name = res["winner"];

    })
  }
  drawGraph(data)
  {
    this.pieChart = {
      chartType: "PieChart",
      dataTable: data,
      options: {
        'Role': 'Count',
        'height': 600,
        'width': 700
      }
    }
  }

}
