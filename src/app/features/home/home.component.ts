// Angular imports
import { Router } from "@angular/router";
import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, MatSortable } from "@angular/material/sort";

// Custom imports
import { AuthService } from "../../core/auth.service";
import { CustomSetService } from "../../core/customSet.service";
import { AddCustomSetDialogComponent } from "./add-set-dialog/add-set-dialog.component";
import { ViewSetComponent } from "./view-set/view-set.component";

// Interface import
import { Skill } from "../../interfaces/skill.interface";
import { CustomSet } from "../../interfaces/customSet.interface";

// Libraries
import * as d3 from "d3";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, AfterViewInit {
  availableSets: any[] = [];
  inDemandSkills: { name: string; votes: number }[] = [];
  chartData: { Tag: string; Mentions: string }[] = [];

  // Table data
  displayedColumns: string[] = ["name", "mentions", "mostMentionsIn"];
  dataSource = new MatTableDataSource<Skill>();

  // Chart properties
  svg: any;
  margin = 0;
  width = 300;
  height = 300;
  radius = Math.min(this.width, this.height) / 2 - this.margin;
  colors: any;

  constructor(
    private authService: AuthService,
    private customSetService: CustomSetService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.fetchCustomSets();
  }

  ngAfterViewInit() {
    // defer the update to the next tick of the event loop, preventing ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.sort.sort({ id: "mentions", start: "desc" } as MatSortable);
      this.dataSource.sort = this.sort;
    });
  }

  fetchCustomSets(): void {
    this.customSetService.getCustomSets().subscribe({
      next: (fetchedSets) => {
        this.availableSets = fetchedSets;
        this.sortAvailableSets();
        this.extractInDemandSkills(fetchedSets);
        this.calculateMostMentions(fetchedSets, this.inDemandSkills);
        this.populateSkillsTable(this.inDemandSkills);
        this.getTagsTotals();
        // create and populate chart
        this.createTagsChartSVG();
        this.createTagsChartColors();
        this.drawTagsChart();
      },
      error: (error) => {
      },
    });
  }

  sortAvailableSets() {
    this.availableSets.sort((a, b) => a.name.localeCompare(b.name));
  }

  extractInDemandSkills(fetchedSets: CustomSet[]) {
    this.inDemandSkills = [];
    fetchedSets.forEach((set: CustomSet) => {
      if (set.skills.length > 0) {
        set.skills.forEach((skill: Skill) => {
          let existingSkill = this.inDemandSkills.find(
            (s) =>
              s.name.trim().toLowerCase() === skill.name.trim().toLowerCase()
          );
          if (existingSkill) {
            existingSkill.votes += skill.votes ?? 0;
          } else {
            this.inDemandSkills.push({
              name: skill.name,
              votes: skill.votes ?? 0,
            });
          }
        });
      }
    });
  }

  populateSkillsTable(inDemandSkills: any) {
    this.dataSource.data = inDemandSkills.map((skill: Skill) => {
      return {
        name: skill.name,
        mentions: skill.votes,
        mostMentionsIn: skill.mostMentionsIn,
      };
    });
  }

  calculateMostMentions(fetchedSets: CustomSet[], inDemandSkills: any) {
    inDemandSkills.forEach((inDemandSkill: Skill) => {
      let currentMaxVotes = 0;
      let setsWithMostVotes: string[] = [];

      fetchedSets.forEach((fetchedSet: CustomSet) => {
        fetchedSet.skills.forEach((fetchedSetSkill: Skill) => {
          if (
            fetchedSetSkill.name.trim().toLowerCase() ===
            inDemandSkill.name.trim().toLowerCase()
          ) {
            if (
              fetchedSetSkill.votes &&
              fetchedSetSkill.votes > currentMaxVotes
            ) {
              currentMaxVotes = fetchedSetSkill.votes;
              setsWithMostVotes = [fetchedSet.name];
            } else if (fetchedSetSkill.votes === currentMaxVotes) {
              setsWithMostVotes.push(fetchedSet.name);
            }
          }
        });
      });
      setsWithMostVotes.sort((a, b) => a.localeCompare(b));
      inDemandSkill.mostMentionsIn = setsWithMostVotes.join(", ");
    });
  }

  openAddCustomSetDialog(): void {
    const dialogRef = this.dialog.open(AddCustomSetDialogComponent, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchCustomSets();
    });
  }

  onSetCardClicked(set: any): void {
    const dialogRef = this.dialog.open(ViewSetComponent, {
      width: "90%",
      height: "90%",
      data: { set: set },
    });

    dialogRef.componentInstance.viewSetDialogClosed.subscribe(() => {
      this.fetchCustomSets();
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchCustomSets();
    });
  }

  getTagsTotals(): void {
    const tagsTotals: { [tag: string]: number } = {};

    this.availableSets.forEach((set) => {
      set.skills.forEach((skill: Skill) => {
        if (skill.tags) {
          skill.tags.forEach((tag) => {
            for (let i = 0; i < (skill.votes ?? 0); i++) {
              tagsTotals[tag] = (tagsTotals[tag] || 0) + 1;
            }
          });
        }
      });
    });

    this.chartData = Object.entries(tagsTotals).map(([tag, mentions]) => ({
      Tag: tag,
      Mentions: mentions.toString(),
    }));
  }

  createTagsChartSVG(): void {
    const existingChart = d3.select("figure#donut-chart svg");
    if (existingChart) {
      existingChart.remove();
    }

    this.svg = d3
      .select("figure#donut-chart")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  createTagsChartColors(): void {
    this.colors = d3
      .scaleOrdinal(d3.schemePastel2)
      .domain(this.chartData.map((d) => d.Mentions.toString()));
  }

  drawTagsChart(): void {
    const pie = d3
      .pie<any>()
      .value((d: any) => Number(d.Mentions))
      .padAngle(0.042);

    const totalMentions = this.chartData.reduce(
      (acc, curr) => acc + Number(curr.Mentions),
      0
    );

    this.svg
      .selectAll("pieces")
      .data(pie(this.chartData))
      .enter()
      .append("path")
      .attr("d", d3.arc().innerRadius(50).outerRadius(this.radius))
      .attr("fill", (d: any, i: any) => this.colors(i))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    const labelLocation = d3.arc().innerRadius(50).outerRadius(this.radius);

    this.svg
      .selectAll("pieces")
      .data(pie(this.chartData))
      .enter()
      .append("text")
      .text((d: any) => d.data.Tag)
      .attr(
        "transform",
        (d: any) => "translate(" + labelLocation.centroid(d) + ")"
      )
      .style("text-anchor", "middle")
      .style("font-size", 15);

    this.svg
      .selectAll("pieces")
      .data(pie(this.chartData))
      .enter()
      .append("text")
      .text(
        (d: any) =>
          ((Number(d.data.Mentions) / totalMentions) * 100).toFixed(0) + "%"
      )
      .attr(
        "transform",
        (d: any) => "translate(" + labelLocation.centroid(d) + ")"
      )
      .attr("dy", "1.5em")
      .style("text-anchor", "middle")
      .style("font-size", 10);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
