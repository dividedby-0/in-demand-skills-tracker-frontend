// Angular
import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";

// Components
import { AddSkillDialogComponent } from "../add-skill-dialog/add-skill-dialog.component";
import { ViewSkillComponent } from "../view-skill/view-skill.component";

// Services
import { CustomSetService } from "../../../core/customSet.service";
import { ConfirmDialogService } from "../../../shared/confirm-dialog.service";

// Interfaces
import { Skill } from "../../../interfaces/skill.interface";

// Libraries
import * as d3 from "d3"; // TODO: d3 should be imported in shared module

@Component({
  selector: "app-view-set",
  templateUrl: "./view-set.component.html",
  styleUrl: "./view-set.component.css",
})
export class ViewSetComponent implements OnInit {
  searchTerm: string = "";
  @Output() viewSetDialogClosed = new EventEmitter<void>();
  setChartData: { Tag: string; Mentions: string }[] = [];

  // Chart properties
  svg: any;
  margin = 0;
  width = 300;
  height = 300;
  radius = Math.min(this.width, this.height) / 2 - this.margin;
  colors: any;

  constructor(
    private dialog: MatDialog,
    private customSetService: CustomSetService,
    private confirmDialogService: ConfirmDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getTagsTotals();
  }

  openAddSkillDialog(set: any) {
    const dialogRef = this.dialog.open(AddSkillDialogComponent, {
      width: "400px",
      data: { set: set },
    });

    dialogRef.componentInstance.addSkillDialogClosed.subscribe(() => {
      this.fetchUpdatedSet(set._id); // to get updated skills to show
    });

    dialogRef.afterClosed().subscribe(() => {
      this.viewSetDialogClosed.emit();
    });
  }

  deleteSet(): void {
    this.confirmDialogService
      .confirm(
        "Confirm Delete",
        "Are you sure you want to delete this location?"
      )
      .subscribe((result) => {
        if (result) {
          this.customSetService.deleteCustomSet(this.data.set._id).subscribe({
            next: () => {
              this.dialog.closeAll();
              this.viewSetDialogClosed.emit();
            },
            error: (error) => {
            },
          });
        }
      });
  }

  onSkillCardClicked(skill: any, data: any): void {
    this.dialog.open(ViewSkillComponent, {
      width: "500px",
      data: { skill: skill, setId: data.set._id },
    });
  }

  fetchUpdatedSet(setId: string) {
    this.customSetService.getSetById(setId).subscribe({
      next: (updatedSet) => {
        this.data.set = updatedSet;
      },
      error: (error) => {
      },
    });
  }

  get averageVotes() {
    const totalVotes = this.data.set.skills.reduce(
      (acc: any, skill: { votes: any }) => acc + skill.votes,
      0
    );
    return this.data.set.skills.length > 0
      ? totalVotes / this.data.set.skills.length
      : 0;
  }

  isAboveAverage(votes: number): boolean {
    return votes > this.averageVotes;
  }

  getTagsTotals(): void {
    const tagsTotals: { [tag: string]: number } = {};

    this.data.set.skills.forEach((skill: Skill) => {
      if (skill.tags) {
        skill.tags.forEach((tag) => {
          for (let i = 0; i < (skill.votes ?? 0); i++) {
            tagsTotals[tag] = (tagsTotals[tag] || 0) + 1;
          }
        });
      }
    });

    this.setChartData = Object.entries(tagsTotals).map(([tag, mentions]) => ({
      Tag: tag,
      Mentions: mentions.toString(),
    }));

    // generate set tags chart
    this.createTagsChartSVG();
    this.createTagsChartColors();
    this.drawTagsChart();
  }

  createTagsChartSVG(): void {
    const existingChart = d3.select("figure#set-donut-chart svg");
    if (existingChart) {
      existingChart.remove();
    }

    this.svg = d3
      .select("figure#set-donut-chart")
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
      .domain(this.setChartData.map((d) => d.Mentions.toString()));
  }

  drawTagsChart(): void {
    const pie = d3
      .pie<any>()
      .value((d: any) => Number(d.Mentions))
      .padAngle(0.042);

    const totalMentions = this.setChartData.reduce(
      (acc, curr) => acc + Number(curr.Mentions),
      0
    );

    this.svg
      .selectAll("pieces")
      .data(pie(this.setChartData))
      .enter()
      .append("path")
      .attr("d", d3.arc().innerRadius(50).outerRadius(this.radius))
      .attr("fill", (d: any, i: any) => this.colors(i))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    const labelLocation = d3.arc().innerRadius(50).outerRadius(this.radius);

    this.svg
      .selectAll("pieces")
      .data(pie(this.setChartData))
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
      .data(pie(this.setChartData))
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

  goBack() {
    this.dialog.closeAll();
  }
}
