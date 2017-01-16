export class NeiDate {
  constructor () {
    let _years = 0
    let _days = 0
    let _hours = 0
    let _minutes = 0
    let _seconds = 0

    this.setYears = years => { _years = years }
    this.setDays = days => { _days = days }
    this.setHours = hours => { _hours = hours }
    this.setMinutes = minutes => { _minutes = minutes }
    this.setSeconds = seconds => { _seconds = seconds }

    this.getYears = _ => _years
    this.getDays = _ => _days
    this.getHours = _ => _hours
    this.getMinutes = _ => _minutes
    this.getSeconds = _ => _seconds

    this.dateDiff = (date1, date2) => {
      let temp = date2 - date1

      temp = Math.floor(temp / 1000)
      this.setSeconds(temp % 60)

      temp = Math.floor((temp - this.seconds) / 60)
      this.setMinutes(temp % 60)

      temp = Math.floor((temp - this.minutes) / 60)
      this.setHours(temp % 24)

      temp = Math.floor((temp - this.hours) / 24)
      this.setDays(temp)

      temp = Math.floor((temp - this.days) / 12)
      this.setYears(temp)
    }
  }
}
