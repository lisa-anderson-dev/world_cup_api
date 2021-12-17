import { tab } from '@testing-library/user-event/dist/tab';
import React, { useEffect } from 'react';
import { isCompositeComponent } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/actions';

function Posts(props) {
    const dispatch = useDispatch();
    const value = useSelector(state => state);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const renderPosts = () => {
        if (value.loading) {
            return <h1>Loading</h1>
        }
        if (value.error) {
            return <h1>An error occured while attempting to fetch the data</h1>
        }

        const usMatches = value.items.filter((e) => e["home_team_country"] === "USA" || e["away_team_country"] === "USA");

        let homeGames = 0;
        let awayGames = 0;
        let homeWins = 0;
        let awayWins = 0;
        let goals = 0;

        usMatches.forEach((e) => {
            if (e["home_team_country"] === "USA") {
                homeGames++;
                goals += e["home_team"]["goals"];
                if (e["winner"] === "USA") homeWins++;
            }
            else {
                awayGames++;
                goals += e["away_team"]["goals"];
                if (e["winner"] === "USA") awayWins++;
            }
        })
        
        const homeWinPercent = homeGames > 0 ? Math.round((homeWins / homeGames) * 100) : 0;
        const awayWinPercent = awayGames > 0 ? Math.round((awayWins / awayGames) * 100) : 0;
        const tableHeaders = ["# Home Games", "Home Win %", "# Away Games", "Away Win %", "Total Goals"];
        const tableStats = [homeGames, homeWinPercent, awayGames, awayWinPercent, goals];
        const tableHeaderCells = tableHeaders.map((e, i) => <th key={i}>{e}</th>);
        const tableStatCells = tableStats.map((e, i) => <td key={i}>{e}</td>);
        
        return (
            <div className="Posts">
                <h1>2019 FIFA Women's World Cup</h1>
                <p>Team USA Results</p>
                <table>
                    <thead>
                    <tr>
                        {tableHeaderCells}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {tableStatCells}
                    </tr>
                    </tbody>
                </table>
            </div>
        )        
    }

    return (
        <div>
            {renderPosts()}
        </div>
    );
}

export default Posts;