import React, {useState, useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Chart} from 'primereact/chart';
import PageTitle from '../components/PageTitle';
import {getStat} from '@/services/stat.service';

export default function Home() {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            'rgba(255, 159, 64)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
          ],
          hoverBackgroundColor: [
            'rgba(255, 159, 64, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(54, 162, 235, 0.8)',
          ],
        },
      ],
    };
    const options = {
      cutout: '60%',
    };
    getStat().then(stat => {
      console.log(stat);

      data.labels.push(stat.numberOfSongs.label);
      data.labels.push(stat.numberOfAlbums.label);
      data.datasets[0].data.push(stat.numberOfSongs.count);
      data.datasets[0].data.push(stat.numberOfAlbums.count);
      setStats([stat.numberOfAlbums, stat.numberOfSongs]);
      console.log(stats);
      setChartData(data);
      setChartOptions(options);
    });
  }, []);

  return (
    <div className="container_stat flex ">
      <DataTable
        value={stats}
        tableStyle={{minWidth: '20rem', overflow: 'hidden'}}>
        <Column field="label" header="categorie"></Column>
        <Column field="count" header="nombre"></Column>
      </DataTable>

      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
}
